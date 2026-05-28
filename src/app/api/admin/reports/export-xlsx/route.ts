import { NextRequest } from 'next/server';
import ExcelJS from 'exceljs';
import { requireAdmin, isNextResponse } from '@/lib/admin/requireRole';
import { auditLog } from '@/lib/admin/audit';
import { buildReport, type ReportSectionId, type ReportData } from '@/lib/admin/reportData';

const VALID_SECTIONS: ReportSectionId[] = [
  'summary',
  'activeUsers',
  'levelProgress',
  'chatTranscripts',
];

const HEADER_FILL = { type: 'pattern' as const, pattern: 'solid' as const, fgColor: { argb: 'FF0072BC' } };
const HEADER_FONT = { bold: true, color: { argb: 'FFFFFFFF' } };

function fmtDate(d: string | Date): string {
  const date = typeof d === 'string' ? new Date(d) : d;
  return date.toISOString().slice(0, 10);
}

function applyHeader(row: ExcelJS.Row) {
  row.eachCell((cell) => {
    cell.fill = HEADER_FILL;
    cell.font = HEADER_FONT;
    cell.alignment = { vertical: 'middle', horizontal: 'left' };
  });
  row.height = 20;
}

function autoFitColumns(sheet: ExcelJS.Worksheet, maxWidth = 60) {
  sheet.columns.forEach((col) => {
    let max = 10;
    col.eachCell?.({ includeEmpty: false }, (cell) => {
      const len = String(cell.value ?? '').length;
      if (len > max) max = len;
    });
    col.width = Math.min(max + 2, maxWidth);
  });
}

function addCoverSheet(wb: ExcelJS.Workbook, data: ReportData, sections: ReportSectionId[]) {
  const sheet = wb.addWorksheet('Report info');
  sheet.addRow(['UNHCR Bulgarian Language Platform - Report']).font = { bold: true, size: 14 };
  sheet.addRow([]);
  sheet.addRow(['Period from', fmtDate(data.period.from)]);
  sheet.addRow(['Period to', fmtDate(data.period.to)]);
  sheet.addRow(['Sections', sections.join(', ')]);
  sheet.addRow(['Generated at', new Date().toISOString()]);
  sheet.getColumn(1).width = 18;
  sheet.getColumn(2).width = 40;
}

function addSummarySheet(wb: ExcelJS.Workbook, data: ReportData) {
  const s = data.sections.summary;
  if (!s) return;
  const sheet = wb.addWorksheet('Summary');
  sheet.addRow(['Metric', 'Value']);
  applyHeader(sheet.lastRow!);
  sheet.addRow(['New users', s.newUsers]);
  sheet.addRow(['Active users (chat or exercises)', s.activeUsers]);
  sheet.addRow(['Conversations', s.conversations]);
  sheet.addRow(['User messages', s.userMessages]);
  sheet.addRow(['Assistant messages', s.assistantMessages]);
  sheet.addRow(['Tokens in', s.tokensIn]);
  sheet.addRow(['Tokens out', s.tokensOut]);
  sheet.addRow(['Total cost (USD)', Number(s.costUsd.toFixed(4))]);
  sheet.addRow([]);
  sheet.addRow(['By model', '']).font = { bold: true };
  sheet.addRow(['Model', 'Messages', 'Tokens in', 'Tokens out', 'Cost (USD)']);
  applyHeader(sheet.lastRow!);
  for (const m of s.byModel) {
    sheet.addRow([m.model, m.messages, m.tokensIn, m.tokensOut, Number(m.costUsd.toFixed(4))]);
  }
  autoFitColumns(sheet);
}

function addActiveUsersSheet(wb: ExcelJS.Workbook, data: ReportData) {
  const rows = data.sections.activeUsers;
  if (!rows) return;
  const sheet = wb.addWorksheet('Active users');
  sheet.addRow([
    'Name',
    'Email',
    'Joined',
    'Current level',
    'Level progress %',
    'Total lessons attempted',
    'Exercises in period',
    'Chat messages in period',
    'Chat cost in period (USD)',
  ]);
  applyHeader(sheet.lastRow!);
  for (const r of rows) {
    sheet.addRow([
      r.name,
      r.email,
      r.joinedAt ? fmtDate(r.joinedAt) : '',
      r.highestLevel ? r.highestLevel.toUpperCase() : '',
      r.highestLevelPct,
      r.totalLessonsAttempted,
      r.exercisesInPeriod,
      r.chatMessagesInPeriod,
      Number(r.chatCostUsd.toFixed(4)),
    ]);
  }
  autoFitColumns(sheet);
}

function addPerLessonSheet(wb: ExcelJS.Workbook, data: ReportData) {
  const rows = data.sections.activeUsers;
  if (!rows) return;
  const sheet = wb.addWorksheet('Per-lesson progress');
  sheet.addRow([
    'User',
    'Email',
    'Level',
    'Lesson',
    'Attempted',
    'Total exercises',
    'Completion %',
  ]);
  applyHeader(sheet.lastRow!);
  for (const u of rows) {
    if (u.perLesson.length === 0) {
      sheet.addRow([u.name, u.email, '', '(no lesson activity)', 0, 0, 0]);
      continue;
    }
    for (const l of u.perLesson) {
      sheet.addRow([
        u.name,
        u.email,
        String(l.level).toUpperCase(),
        l.lessonId,
        l.attemptedCount,
        l.totalCount,
        l.pct,
      ]);
    }
  }
  autoFitColumns(sheet);
}

function addLevelProgressSheet(wb: ExcelJS.Workbook, data: ReportData) {
  const lp = data.sections.levelProgress;
  if (!lp) return;
  const sheet = wb.addWorksheet('Level progress');
  sheet.addRow(['Cumulative learning progress across all users (all-time)']).font = { italic: true, color: { argb: 'FF888888' } };
  sheet.addRow([]);
  sheet.addRow(['Level', 'Active users', 'Average completion %']);
  applyHeader(sheet.lastRow!);
  for (const r of lp.byLevel) {
    sheet.addRow([r.level.toUpperCase(), r.activeUsers, r.avgPct]);
  }
  sheet.addRow([]);
  sheet.addRow(['Distribution by level (users per progress bucket)']).font = { bold: true };
  const bucketNames = lp.histogramByLevel[0]?.buckets.map((b) => b.bucket) ?? [];
  sheet.addRow(['Level', ...bucketNames]);
  applyHeader(sheet.lastRow!);
  for (const r of lp.histogramByLevel) {
    sheet.addRow([r.level.toUpperCase(), ...r.buckets.map((b) => b.users)]);
  }
  autoFitColumns(sheet);
}

function addChatTranscriptsSheet(wb: ExcelJS.Workbook, data: ReportData) {
  const transcripts = data.sections.chatTranscripts;
  if (!transcripts || transcripts.length === 0) return;

  const overview = wb.addWorksheet('Chat transcripts (overview)');
  overview.addRow([
    'Conversation #',
    'User',
    'Email',
    'Language',
    'Level',
    'Started',
    'Last message',
    'Message count',
    'Cost (USD)',
  ]);
  applyHeader(overview.lastRow!);
  for (const t of transcripts) {
    overview.addRow([
      t.conversationId,
      t.userName,
      t.userEmail,
      t.language,
      t.level ? t.level.toUpperCase() : '',
      fmtDate(t.startedAt),
      fmtDate(t.lastMessageAt),
      t.messageCount,
      Number(t.costUsd.toFixed(4)),
    ]);
  }
  autoFitColumns(overview);

  const messages = wb.addWorksheet('Chat transcripts (messages)');
  messages.addRow(['Conversation #', 'User', 'Time', 'Role', 'Tokens in', 'Tokens out', 'Content']);
  applyHeader(messages.lastRow!);
  for (const t of transcripts) {
    for (const m of t.messages) {
      messages.addRow([
        t.conversationId,
        t.userName,
        m.createdAt ? new Date(m.createdAt).toISOString() : '',
        m.role,
        m.tokensIn ?? '',
        m.tokensOut ?? '',
        m.contentRedacted ? '[redacted] ' + m.content : m.content,
      ]);
    }
  }
  messages.getColumn(7).alignment = { wrapText: true, vertical: 'top' };
  messages.getColumn(7).width = 80;
  for (const idx of [1, 2, 3, 4, 5, 6]) {
    const col = messages.getColumn(idx);
    let max = 8;
    col.eachCell?.({ includeEmpty: false }, (cell) => {
      const len = String(cell.value ?? '').length;
      if (len > max) max = len;
    });
    col.width = Math.min(max + 2, 30);
  }
}

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req, 'admin');
  if (isNextResponse(auth)) return auth;

  const { searchParams } = req.nextUrl;
  const from = searchParams.get('from')
    ? new Date(searchParams.get('from')!)
    : new Date(Date.now() - 30 * 86400_000);
  const to = searchParams.get('to') ? new Date(searchParams.get('to')!) : new Date();

  const sections = (searchParams.get('sections') ?? 'summary,activeUsers,levelProgress')
    .split(',')
    .map((s) => s.trim())
    .filter((s): s is ReportSectionId => VALID_SECTIONS.includes(s as ReportSectionId));

  const data = await buildReport({ from, to, sections });

  const wb = new ExcelJS.Workbook();
  wb.creator = 'UNHCR Bulgarian Language Platform';
  wb.created = new Date();

  addCoverSheet(wb, data, sections);
  addSummarySheet(wb, data);
  addActiveUsersSheet(wb, data);
  addPerLessonSheet(wb, data);
  addLevelProgressSheet(wb, data);
  addChatTranscriptsSheet(wb, data);

  const buffer = await wb.xlsx.writeBuffer();

  await auditLog(
    auth.userId,
    'exported_report_xlsx',
    `from=${fmtDate(from)} to=${fmtDate(to)} sections=${sections.join('|')}`,
  );

  const filename = `robi-report-${fmtDate(from)}_to_${fmtDate(to)}.xlsx`;
  return new Response(buffer, {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  });
}