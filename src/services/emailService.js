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
  const LOGO_URL       = 'https://talent-factory-tau.vercel.app/logos/logo-1.svg';

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
<body style="margin:0;padding:0;background-color:#0c0c14;font-family:'Segoe UI',Helvetica,Arial,sans-serif;">

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0c0c14;padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="580" cellpadding="0" cellspacing="0" style="max-width:580px;width:100%;">

          <!-- LOGO BAR -->
          <tr>
            <td align="center" style="padding-bottom:28px;">
              <img
                src="${LOGO_URL}"
                alt="TalentFactory HQ"
                width="48"
                height="48"
                style="display:block;border:0;"
              />
            </td>
          </tr>

          <!-- MAIN CARD -->
          <tr>
            <td style="background:linear-gradient(160deg,#16162a 0%,#0f0f20 100%);border-radius:20px;border:1px solid rgba(255,255,255,0.07);overflow:hidden;">

              <!-- HEADER STRIPE -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:linear-gradient(135deg,#1c1c38 0%,#131328 100%);padding:44px 48px 36px;text-align:center;border-bottom:1px solid rgba(255,255,255,0.06);">
                    <div style="display:inline-block;background:linear-gradient(135deg,#c9a227,#e8bf46);border-radius:50%;width:56px;height:56px;line-height:56px;font-size:26px;margin-bottom:20px;text-align:center;">✓</div>
                    <h1 style="margin:0 0 8px;font-size:26px;font-weight:700;color:#ffffff;letter-spacing:-0.3px;line-height:1.2;">
                      You're on the list, ${firstName}!
                    </h1>
                    <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.45);letter-spacing:1.5px;text-transform:uppercase;">
                      TalentFactory Professional Learning
                    </p>
                  </td>
                </tr>
              </table>

              <!-- BODY -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:40px 48px;">

                    <p style="margin:0 0 20px;font-size:16px;color:rgba(255,255,255,0.75);line-height:1.75;">
                      Thank you for joining the waitlist. We're building a continuous professional learning platform built exclusively for <strong style="color:#e8bf46;">practising HR professionals</strong> — and you're among the first to know.
                    </p>

                    <p style="margin:0 0 36px;font-size:16px;color:rgba(255,255,255,0.75);line-height:1.75;">
                      When early access opens, you'll be the first to hear. In the meantime, stay connected with our community and newsletter below.
                    </p>

                    <!-- DIVIDER -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:36px;">
                      <tr><td style="border-top:1px solid rgba(255,255,255,0.07);font-size:0;line-height:0;">&nbsp;</td></tr>
                    </table>

                    <!-- WHAT'S COMING -->
                    <p style="margin:0 0 16px;font-size:12px;color:rgba(255,255,255,0.35);letter-spacing:1.5px;text-transform:uppercase;font-weight:600;">What's coming</p>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:36px;">
                      <tr>
                        <td valign="top" style="width:28px;padding-top:2px;">
                          <div style="width:20px;height:20px;background:rgba(201,162,39,0.15);border:1px solid rgba(201,162,39,0.3);border-radius:6px;text-align:center;line-height:20px;font-size:12px;">📚</div>
                        </td>
                        <td style="padding-left:12px;">
                          <p style="margin:0 0 4px;font-size:14px;font-weight:600;color:#ffffff;">26+ On-Demand Courses</p>
                          <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.45);line-height:1.6;">Covering AI &amp; People Analytics, Talent Acquisition, Performance, L&amp;D, and more.</p>
                        </td>
                      </tr>
                      <tr><td colspan="2" style="padding:10px 0;"><div style="border-top:1px solid rgba(255,255,255,0.05);"></div></td></tr>
                      <tr>
                        <td valign="top" style="width:28px;padding-top:2px;">
                          <div style="width:20px;height:20px;background:rgba(201,162,39,0.15);border:1px solid rgba(201,162,39,0.3);border-radius:6px;text-align:center;line-height:20px;font-size:12px;">🎓</div>
                        </td>
                        <td style="padding-left:12px;">
                          <p style="margin:0 0 4px;font-size:14px;font-weight:600;color:#ffffff;">Verified Certificates</p>
                          <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.45);line-height:1.6;">Earn a certificate for every completed course to share with your network.</p>
                        </td>
                      </tr>
                      <tr><td colspan="2" style="padding:10px 0;"><div style="border-top:1px solid rgba(255,255,255,0.05);"></div></td></tr>
                      <tr>
                        <td valign="top" style="width:28px;padding-top:2px;">
                          <div style="width:20px;height:20px;background:rgba(201,162,39,0.15);border:1px solid rgba(201,162,39,0.3);border-radius:6px;text-align:center;line-height:20px;font-size:12px;">🛤️</div>
                        </td>
                        <td style="padding-left:12px;">
                          <p style="margin:0 0 4px;font-size:14px;font-weight:600;color:#ffffff;">Your Own Learning Path</p>
                          <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.45);line-height:1.6;">Focus on your gaps. Build your skills at your own pace, around your career.</p>
                        </td>
                      </tr>
                    </table>

                    <!-- DIVIDER -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:36px;">
                      <tr><td style="border-top:1px solid rgba(255,255,255,0.07);font-size:0;line-height:0;">&nbsp;</td></tr>
                    </table>

                    <!-- CTA BUTTONS -->
                    <p style="margin:0 0 16px;font-size:12px;color:rgba(255,255,255,0.35);letter-spacing:1.5px;text-transform:uppercase;font-weight:600;">Stay connected</p>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-bottom:12px;">
                          <a href="${COMMUNITY_URL}" target="_blank" style="display:block;background:linear-gradient(135deg,#c9a227,#e8bf46);border-radius:10px;padding:14px 24px;text-align:center;font-size:14px;font-weight:700;color:#0c0c14;text-decoration:none;letter-spacing:0.2px;">
                            👥 &nbsp; Join the Community
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <a href="${NEWSLETTER_URL}" target="_blank" style="display:block;background:transparent;border:1px solid rgba(255,255,255,0.15);border-radius:10px;padding:14px 24px;text-align:center;font-size:14px;font-weight:600;color:rgba(255,255,255,0.75);text-decoration:none;letter-spacing:0.2px;">
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
            <td align="center" style="padding-top:32px;">
              <p style="margin:0 0 8px;font-size:12px;color:rgba(255,255,255,0.2);line-height:1.6;">
                You received this because you joined the TalentFactory HQ waitlist.<br />
                If this wasn't you, simply ignore this email.
              </p>
              <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.15);">
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
