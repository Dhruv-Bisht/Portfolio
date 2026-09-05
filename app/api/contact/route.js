// This runs as a Node.js serverless function on Vercel.
// Sends the message via Resend. Requires a RESEND_API_KEY environment
// variable set in your Vercel project settings.

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return Response.json({ ok: false, error: 'Name, email, and message are all required.' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY is not set — message not sent:', { name, email, message });
      return Response.json(
        { ok: false, error: 'Email service is not configured yet.' },
        { status: 500 }
      );
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: 'dhruvbist123@gmail.com',
        reply_to: email,
        subject: `New message from ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      }),
    });

    if (!res.ok) {
      const errBody = await res.text();
      console.error('Resend API error:', res.status, errBody);
      return Response.json({ ok: false, error: 'Could not send the message.' }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    return Response.json({ ok: false, error: 'Something went wrong on the server.' }, { status: 500 });
  }
}
