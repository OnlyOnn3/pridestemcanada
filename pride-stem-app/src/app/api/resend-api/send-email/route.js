import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const email = 'ishigamicm@gmail.com';

  try {
    const message = await resend.emails.send({
      from: 'sandbox@resend.dev',
      to: email,
      subject: 'Conference Registration Successful',
      html: `<p>Test Email</p>`,
    });

    // console.log("Email sent successfully:", message);

    return new Response(JSON.stringify({ success: true, message }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    console.error('Could not send email:', err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
