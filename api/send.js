import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed.',
    });
  }

  try {
    // Check environment variables first
    if (!process.env.RESEND_API_KEY) {
      console.error('Missing RESEND_API_KEY');

      return res.status(500).json({
        success: false,
        error: 'Email service is not configured.',
      });
    }

    if (!process.env.CONTACT_EMAIL) {
      console.error('Missing CONTACT_EMAIL');

      return res.status(500).json({
        success: false,
        error: 'Contact email is not configured.',
      });
    }

    // Get form data
    const { name, email, message } = req.body || {};

    // Validate fields
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Please fill in all fields.',
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid email address.',
      });
    }

    // Clean / escape user input before putting it into HTML
    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safeMessage = escapeHtml(message.trim()).replace(/\n/g, '<br>');

    // Send email through Resend
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: [process.env.CONTACT_EMAIL],
      replyTo: email.trim(),
      subject: `New Portfolio Inquiry from ${name.trim()}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8" />
            <title>New Portfolio Inquiry</title>
          </head>

          <body
            style="
              margin: 0;
              padding: 0;
              background: #0a0a0a;
              font-family: Arial, Helvetica, sans-serif;
              color: #ffffff;
            "
          >
            <div
              style="
                max-width: 650px;
                margin: 40px auto;
                padding: 32px;
                background: #111111;
                border: 1px solid #222222;
                border-radius: 16px;
              "
            >
              <h1
                style="
                  margin: 0 0 8px;
                  font-size: 26px;
                  color: #ffffff;
                "
              >
                New Portfolio Inquiry
              </h1>

              <p
                style="
                  margin: 0 0 30px;
                  color: #999999;
                  font-size: 14px;
                "
              >
                Someone contacted you through your portfolio website.
              </p>

              <div
                style="
                  padding: 20px;
                  background: #181818;
                  border-radius: 12px;
                  margin-bottom: 20px;
                "
              >
                <p style="margin: 0 0 12px;">
                  <strong style="color: #e50914;">Name</strong>
                </p>

                <p style="margin: 0; color: #dddddd;">
                  ${safeName}
                </p>
              </div>

              <div
                style="
                  padding: 20px;
                  background: #181818;
                  border-radius: 12px;
                  margin-bottom: 20px;
                "
              >
                <p style="margin: 0 0 12px;">
                  <strong style="color: #e50914;">Email</strong>
                </p>

                <p style="margin: 0; color: #dddddd;">
                  ${safeEmail}
                </p>
              </div>

              <div
                style="
                  padding: 20px;
                  background: #181818;
                  border-radius: 12px;
                  margin-bottom: 20px;
                "
              >
                <p style="margin: 0 0 12px;">
                  <strong style="color: #e50914;">Project Details</strong>
                </p>

                <p
                  style="
                    margin: 0;
                    color: #dddddd;
                    line-height: 1.7;
                    white-space: normal;
                  "
                >
                  ${safeMessage}
                </p>
              </div>

              <div
                style="
                  margin-top: 30px;
                  padding-top: 20px;
                  border-top: 1px solid #222222;
                "
              >
                <p
                  style="
                    margin: 0;
                    font-size: 12px;
                    color: #666666;
                  "
                >
                  Sent from Erlan Villania Portfolio
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    // Resend returned an error
    if (error) {
      console.error('Resend error:', error);

      return res.status(400).json({
        success: false,
        error: error.message || 'Resend failed to send the email.',
      });
    }

    // Success
    console.log('Email sent successfully:', data?.id);

    return res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully.',
      id: data?.id || null,
    });
  } catch (error) {
    console.error('API error:', error);

    return res.status(500).json({
      success: false,
      error: error?.message || 'Something went wrong while sending the email.',
    });
  }
}