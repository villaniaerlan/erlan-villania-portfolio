import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed',
    });
  }

  try {
    const { name, email, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({
        error: 'All fields are required.',
      });
    }

    if (!process.env.RESEND_API_KEY) {
      return res.status(500).json({
        error: 'RESEND_API_KEY is not configured.',
      });
    }

    if (!process.env.CONTACT_EMAIL) {
      return res.status(500).json({
        error: 'CONTACT_EMAIL is not configured.',
      });
    }

    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: [process.env.CONTACT_EMAIL],
      replyTo: email,
      subject: `New Portfolio Inquiry from ${name}`,
      html: `
        <h2>New Portfolio Inquiry</h2>

        <p><strong>Name:</strong> ${name}</p>

        <p><strong>Email:</strong> ${email}</p>

        <p><strong>Project Details:</strong></p>

        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);

      return res.status(400).json({
        error: error.message || 'Resend failed to send the email.',
      });
    }

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error('API error:', error);

    return res.status(500).json({
      error: error.message || 'Something went wrong.',
    });
  }
}