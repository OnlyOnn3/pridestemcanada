import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      subject = "",
      html = "",
      text,
      to = process.env.SENDER_EMAIL,
      from = "sandbox@resend.dev"
    } = body;

    const message = await resend.emails.send({
      from,
      to,
      subject,
      html,
      text,
    });

    return new Response(JSON.stringify({ success: true, message }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Could not send email:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
