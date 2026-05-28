import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, isNextResponse } from '@/lib/admin/requireRole';
import { auditLog } from '@/lib/admin/audit';
import { buildReport, type ReportSectionId } from '@/lib/admin/reportData';

const VALID_SECTIONS: ReportSectionId[] = [
  'summary',
  'activeUsers',
  'levelProgress',
  'chatTranscripts',
];

/**
 * GET /api/admin/reports/build?from=YYYY-MM-DD&to=YYYY-MM-DD&sections=summary,activeUsers,...
 *
 * Returns the JSON used by the on-screen preview in the Report Builder.
 * Same data is consumed by the XLSX export endpoint.
 */
export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req, 'admin');
  if (isNextResponse(auth)) return auth;

  const { searchParams } = req.nextUrl;
  const from = searchParams.get('from')
    ? new Date(searchParams.get('from')!)
    : new Date(Date.now() - 30 * 86400_000);
  const to = searchParams.get('to') ? new Date(searchParams.get('to')!) : new Date();

  const sectionsParam = (searchParams.get('sections') ?? 'summary,activeUsers,levelProgress')
    .split(',')
    .map((s) => s.trim())
    .filter((s): s is ReportSectionId => VALID_SECTIONS.includes(s as ReportSectionId));

  const data = await buildReport({ from, to, sections: sectionsParam });

  await auditLog(
    auth.userId,
    'built_report',
    `from=${from.toISOString().slice(0, 10)} to=${to.toISOString().slice(0, 10)} sections=${sectionsParam.join('|')}`,
  );

  return NextResponse.json(data);
}