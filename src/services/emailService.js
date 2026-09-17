const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send a confirmation email to a new waitlist registrant.
 * @param {Object} params
 * @param {string} params.fullName
 * @param {string} params.email
 * @param {number} params.position
 */
async function sendConfirmationEmail({ fullName, email, position }) {
  const firstName = fullName.split(' ')[0];

  const { data, error } = await resend.emails.send({
    from: process.env.FROM_EMAIL || 'TalentFlow <contact@talentfactoryhq.com>',
    to: email,
    subject: `You're on the TalentFlow Waitlist! 🎉`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome to TalentFlow Waitlist</title>
</head>
<body style="margin:0;padding:0;background:#0a0a1a;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a1a;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#1a1a3e 0%,#0d1b3e 100%);border-radius:16px 16px 0 0;padding:48px 40px 36px;text-align:center;border-bottom:1px solid rgba(212,175,55,0.2);">
              <div style="display:inline-block;background:linear-gradient(135deg,#d4af37,#f0c040);border-radius:50%;width:64px;height:64px;line-height:64px;font-size:28px;margin-bottom:20px;">⚡</div>
              <h1 style="margin:0;font-size:28px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">TalentFactory HQ</h1>
              <p style="margin:8px 0 0;font-size:13px;color:rgba(212,175,55,0.8);text-transform:uppercase;letter-spacing:2px;">The Future of Professional Learning</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#0f0f2a;padding:40px;border-left:1px solid rgba(255,255,255,0.05);border-right:1px solid rgba(255,255,255,0.05);">
              <h2 style="margin:0 0 12px;font-size:22px;color:#ffffff;font-weight:700;">Hey ${firstName}! You're in 🎊</h2>
              <p style="margin:0 0 24px;font-size:15px;color:rgba(255,255,255,0.7);line-height:1.7;">
                You've officially joined the TalentFactory HQ waitlist. We're building the most powerful professional learning platform ever created, and you're one of the first to be part of it.
              </p>

              <!-- Position badge -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td style="background:linear-gradient(135deg,rgba(212,175,55,0.15),rgba(212,175,55,0.05));border:1px solid rgba(212,175,55,0.3);border-radius:12px;padding:24px;text-align:center;">
                    <p style="margin:0 0 4px;font-size:12px;text-transform:uppercase;letter-spacing:2px;color:rgba(212,175,55,0.8);">Your Waitlist Position</p>
                    <p style="margin:0;font-size:48px;font-weight:800;color:#d4af37;">#${position}</p>
                    <p style="margin:4px 0 0;font-size:13px;color:rgba(255,255,255,0.5);">The earlier you sign up, the higher you climb</p>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 16px;font-size:15px;color:rgba(255,255,255,0.7);line-height:1.7;">
                <strong style="color:#ffffff;">What happens next?</strong> We'll notify you the moment early access opens. Priority access goes to the first people on the list, so keep an eye on your inbox.
              </p>

              <!-- Divider -->
              <hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);margin:32px 0;" />

              <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.4);line-height:1.6;">
                You're receiving this email because you signed up for the TalentFactory HQ waitlist. If this wasn't you, you can safely ignore this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#080818;border-radius:0 0 16px 16px;padding:24px 40px;text-align:center;border-top:1px solid rgba(255,255,255,0.05);">
              <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.3);">
                © ${new Date().getFullYear()} TalentFactory HQ. All rights reserved.<br/>
                Continuous professional learning for practising HR professionals.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  });

  if (error) {
    console.error('[Email Error]', error);
    throw new Error(`Failed to send confirmation email: ${error.message}`);
  }

  console.log(`[Email Sent] To: ${email}, ID: ${data?.id}`);
  return data;
}

module.exports = { sendConfirmationEmail };
