// Vercel serverless function for direct contact submissions.
// Uses FormSubmit.co AJAX forwarding to send emails directly to ajayarjun727@gmail.com.
// Requires ZERO API keys, ZERO account registration, and works instantly out of the box!

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
    return res.status(400).json({ error: 'Invalid email address' });
  }

  const destinationEmail = 'ajayarjun727@gmail.com';

  try {
    console.log(`Forwarding message from ${name} directly to ${destinationEmail}...`);
    
    // Call FormSubmit.co AJAX endpoint to deliver the email
    const response = await fetch(`https://formsubmit.co/ajax/${destinationEmail}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
        message: message,
        _subject: `New Portfolio Review from ${name}`
      })
    });

    if (response.ok) {
      const data = await response.json();
      console.log('FormSubmit transmission response:', data);
      return res.status(200).json({ ok: true });
    } else {
      const errText = await response.text();
      console.error('FormSubmit transmission failed:', errText);
      return res.status(500).json({ error: 'Mail delivery gateway error' });
    }
  } catch (err) {
    console.error('Contact handler error:', err);
    return res.status(500).json({ error: 'System error in mail transmission' });
  }
}
