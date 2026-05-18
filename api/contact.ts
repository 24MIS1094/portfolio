// Placeholder Vercel serverless function for contact submissions.
// Integrate with an email provider (SendGrid, SES, Mailgun) or webhook by replacing the TODO.

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  try {
    // TODO: Send the email via your provider here.
    // Example: await sendGrid.send({ to: YOUR_EMAIL, from: email, subject: `Contact from ${name}`, text: message });

    console.log('Contact submission:', { name, email, message });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Contact handler error:', err);
    return res.status(500).json({ error: 'Failed to send message' });
  }
}
