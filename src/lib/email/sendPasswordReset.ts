import { Resend } from 'resend';

// Resend client — lazy-init so the API key isn't required at build time.
let resendClient: Resend | null = null;
function getResend(): Resend {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error('RESEND_API_KEY is not configured');
    }
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

const FROM_ADDRESS = process.env.EMAIL_FROM || 'UNHCR Bulgarian <onboarding@resend.dev>';

interface SendPasswordResetParams {
  to: string;
  name: string;
  resetUrl: string;
}

/**
 * Sends a password-reset email containing a one-click reset link.
 * Body is bilingual (Bulgarian + English) since most users speak at least one
 * of these well enough, and email clients can't translate at runtime.
 *
 * Throws on transport errors so the caller can decide what to surface to the
 * user. The forgot-password API route catches and swallows errors to avoid
 * leaking which addresses are registered.
 */
export async function sendPasswordResetEmail({
  to,
  name,
  resetUrl,
}: SendPasswordResetParams): Promise<void> {
  const safeName = escapeHtml(name || '');
  const safeUrl = escapeHtmlAttr(resetUrl);

  const subject = 'Възстановяване на парола / Password reset — UNHCR Bulgarian';

  const html = `<!doctype html>
<html lang="bg">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#262626;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);">
          <tr>
            <td style="background:#0072BC;padding:20px 28px;color:#ffffff;font-size:18px;font-weight:600;">
              UNHCR — Български език за бежанци
            </td>
          </tr>
          <tr>
            <td style="padding:28px;">
              <h1 style="margin:0 0 16px;font-size:20px;color:#0072BC;">Възстановяване на парола</h1>
              <p style="margin:0 0 12px;font-size:15px;line-height:1.55;">Здравейте${safeName ? ', ' + safeName : ''},</p>
              <p style="margin:0 0 18px;font-size:15px;line-height:1.55;">Получихме заявка за смяна на паролата на Вашия акаунт. Натиснете бутона по-долу, за да зададете нова парола:</p>
              <p style="margin:0 0 24px;text-align:center;">
                <a href="${safeUrl}" style="display:inline-block;background:#0072BC;color:#ffffff;text-decoration:none;font-weight:600;padding:14px 28px;border-radius:8px;font-size:15px;">Задай нова парола</a>
              </p>
              <p style="margin:0 0 8px;font-size:13px;color:#737373;line-height:1.5;">Линкът е валиден <strong>1 час</strong> и може да се използва само веднъж. Ако не сте поискали смяна на паролата, можете да пренебрегнете този имейл — паролата Ви остава непроменена.</p>
              <p style="margin:16px 0 0;font-size:12px;color:#737373;line-height:1.5;word-break:break-all;">Ако бутонът не работи, копирайте този адрес в браузъра си:<br/><a href="${safeUrl}" style="color:#0072BC;">${escapeHtml(resetUrl)}</a></p>

              <hr style="border:none;border-top:1px solid #e5e5e5;margin:28px 0;" />

              <h2 style="margin:0 0 12px;font-size:16px;color:#0072BC;">Password reset</h2>
              <p style="margin:0 0 12px;font-size:15px;line-height:1.55;">Hello${safeName ? ', ' + safeName : ''},</p>
              <p style="margin:0 0 18px;font-size:15px;line-height:1.55;">We received a request to reset the password for your account. Click the button above (or the link) to set a new password.</p>
              <p style="margin:0;font-size:13px;color:#737373;line-height:1.5;">The link is valid for <strong>1 hour</strong> and can be used only once. If you didn't request a password reset, you can safely ignore this email — your password will stay unchanged.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 28px;background:#fafafa;color:#737373;font-size:12px;text-align:center;">
              UNHCR · Безплатна платформа за изучаване на български език
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = `Възстановяване на парола — UNHCR Bulgarian

Здравейте${safeName ? ', ' + name : ''},

Получихме заявка за смяна на паролата на Вашия акаунт. Отворете този линк, за да зададете нова парола (валиден 1 час, еднократен):

${resetUrl}

Ако не сте поискали смяна на паролата, пренебрегнете този имейл.

— — —

Password reset — UNHCR Bulgarian

Hello${safeName ? ', ' + name : ''},

We received a request to reset the password for your account. Open the link below to set a new password (valid for 1 hour, single use):

${resetUrl}

If you didn't request a password reset, please ignore this email.
`;

  const { error } = await getResend().emails.send({
    from: FROM_ADDRESS,
    to,
    subject,
    html,
    text,
  });

  if (error) {
    throw new Error(`Resend API error: ${error.message ?? JSON.stringify(error)}`);
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeHtmlAttr(str: string): string {
  return escapeHtml(str);
}
