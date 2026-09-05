// This runs as a Node.js serverless function on Vercel.
// Swap the console.log below for a real email provider
// (Resend, Nodemailer + SMTP, SendGrid, etc.) when you deploy.

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return Response.json({ ok: false, error: 'Name, email, and message are all required.' }, { status: 400 });
    }

    // TODO: send an actual email. Example with Resend:
    // await fetch('https://api.resend.com/emails', {
    //   method: 'POST',
    //   headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     from: 'portfolio@yourdomain.com',
    //     to: 'dhruvbist123@gmail.com',
    //     subject: `New message from ${name}`,
    //     text: message,
    //   }),
    // });

    console.log('New contact message:', { name, email, message });

    return Response.json({ ok: true });
  } catch (err) {
    return Response.json({ ok: false, error: 'Something went wrong on the server.' }, { status: 500 });
  }
}
