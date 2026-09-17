const { Resend } = require('resend');

/**
 * Send a confirmation email to a new waitlist registrant.
 * @param {Object} params
 * @param {string} params.fullName
 * @param {string} params.email
 * @param {number} params.position
 */
async function sendConfirmationEmail({ fullName, email, position }) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const firstName = fullName.split(' ')[0];

  const NEWSLETTER_URL = 'https://talentfactoryhq.substack.com';
  const COMMUNITY_URL  = 'https://chat.whatsapp.com/Gg3pCbWCa6iDlV53deSqBL?s=cl&p=a&mlu=4&ilr=4';
  const LOGO_URL       = 'https://res.cloudinary.com/dunid4t4g/image/upload/v1789654478/icon-main_aukejr.png';

  const { data, error } = await resend.emails.send({
    from: process.env.FROM_EMAIL || 'TalentFactory HQ <contact@talentfactoryhq.com>',
    to: email,
    subject: `Welcome to TalentFactory HQ, ${firstName}! 🎉`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to TalentFactory HQ</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:'Segoe UI',Helvetica,Arial,sans-serif;">

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="580" cellpadding="0" cellspacing="0" style="max-width:580px;width:100%;">

          <!-- MAIN CARD -->
          <tr>
            <td style="background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e4e4e7;">

              <!-- HEADER -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:40px 48px 32px;text-align:center;border-bottom:1px solid #f0f0f0;">
                    <img
                      src="${LOGO_URL}"
                      alt="TalentFactory HQ"
                      width="56"
                      height="56"
                      style="display:block;margin:0 auto 20px;border:0;"
                    />
                    <h1 style="margin:0 0 6px;font-size:22px;font-weight:700;color:#09090b;letter-spacing:-0.3px;line-height:1.3;">
                      You're on the list, ${firstName}!
                    </h1>
                    <p style="margin:0;font-size:13px;color:#71717a;letter-spacing:0.5px;">
                      TalentFactory Professional Learning
                    </p>
                  </td>
                </tr>
              </table>

              <!-- BODY -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:36px 48px;">

                    <p style="margin:0 0 18px;font-size:15px;color:#3f3f46;line-height:1.75;">
                      Hi ${firstName},
                    </p>
                    <p style="margin:0 0 18px;font-size:15px;color:#3f3f46;line-height:1.75;">
                      Thank you for joining the waitlist. We're building a continuous professional learning platform built exclusively for <strong style="color:#09090b;">practising HR professionals</strong> — and you're among the first to know.
                    </p>
                    <p style="margin:0 0 32px;font-size:15px;color:#3f3f46;line-height:1.75;">
                      When early access opens, you'll be the first to hear. In the meantime, stay connected with our community and newsletter below.
                    </p>

                    <!-- DIVIDER -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                      <tr><td style="border-top:1px solid #f0f0f0;font-size:0;line-height:0;">&nbsp;</td></tr>
                    </table>

                    <!-- WHAT'S COMING -->
                    <p style="margin:0 0 14px;font-size:11px;color:#a1a1aa;letter-spacing:1.5px;text-transform:uppercase;font-weight:600;">What's coming</p>

                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;">
                      <tr>
                        <td valign="top" style="width:32px;padding-top:1px;">
                          <div style="width:24px;height:24px;background:#f4f4f5;border-radius:6px;text-align:center;line-height:24px;font-size:13px;">📚</div>
                        </td>
                        <td style="padding-left:12px;padding-bottom:16px;border-bottom:1px solid #f4f4f5;">
                          <p style="margin:0 0 3px;font-size:14px;font-weight:600;color:#09090b;">26+ On-Demand Courses</p>
                          <p style="margin:0;font-size:13px;color:#71717a;line-height:1.6;">AI &amp; People Analytics, Talent Acquisition, Performance, L&amp;D and more.</p>
                        </td>
                      </tr>
                    </table>

                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;">
                      <tr>
                        <td valign="top" style="width:32px;padding-top:1px;">
                          <div style="width:24px;height:24px;background:#f4f4f5;border-radius:6px;text-align:center;line-height:24px;font-size:13px;">🎓</div>
                        </td>
                        <td style="padding-left:12px;padding-bottom:16px;border-bottom:1px solid #f4f4f5;">
                          <p style="margin:0 0 3px;font-size:14px;font-weight:600;color:#09090b;">Verified Certificates</p>
                          <p style="margin:0;font-size:13px;color:#71717a;line-height:1.6;">Earn a certificate for every completed course to share with your network.</p>
                        </td>
                      </tr>
                    </table>

                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                      <tr>
                        <td valign="top" style="width:32px;padding-top:1px;">
                          <div style="width:24px;height:24px;background:#f4f4f5;border-radius:6px;text-align:center;line-height:24px;font-size:13px;">🛤️</div>
                        </td>
                        <td style="padding-left:12px;">
                          <p style="margin:0 0 3px;font-size:14px;font-weight:600;color:#09090b;">Your Own Learning Path</p>
                          <p style="margin:0;font-size:13px;color:#71717a;line-height:1.6;">Focus on your gaps. Build your skills at your own pace, around your career.</p>
                        </td>
                      </tr>
                    </table>

                    <!-- DIVIDER -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                      <tr><td style="border-top:1px solid #f0f0f0;font-size:0;line-height:0;">&nbsp;</td></tr>
                    </table>

                    <!-- CTA BUTTONS -->
                    <p style="margin:0 0 14px;font-size:11px;color:#a1a1aa;letter-spacing:1.5px;text-transform:uppercase;font-weight:600;">Stay connected</p>

                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-bottom:10px;">
                          <a href="${COMMUNITY_URL}" target="_blank"
                            style="display:block;background:#09090b;border-radius:8px;padding:13px 24px;text-align:center;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;">
                            👥 &nbsp; Join the Community
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <a href="${NEWSLETTER_URL}" target="_blank"
                            style="display:block;background:#ffffff;border:1px solid #e4e4e7;border-radius:8px;padding:13px 24px;text-align:center;font-size:14px;font-weight:600;color:#09090b;text-decoration:none;">
                            ✉️ &nbsp; Subscribe to Newsletter
                          </a>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td align="center" style="padding-top:24px;">
              <p style="margin:0 0 4px;font-size:12px;color:#a1a1aa;line-height:1.6;">
                You received this because you joined the TalentFactory HQ waitlist.<br />
                If this wasn't you, simply ignore this email.
              </p>
              <p style="margin:0;font-size:12px;color:#d4d4d8;">
                © ${new Date().getFullYear()} TalentFactory HQ · All rights reserved.
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
