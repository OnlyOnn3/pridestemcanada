import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      subject = "",
      html = "",
      text,
      to,
      from = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev"
    } = body;

    if (!to) {
      return new Response(JSON.stringify({ error: "Recipient email is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.log('Sending email to:', to, 'from:', from);

    const message = await resend.emails.send({
      from,
      to,
      subject,
      html,
      text,
    });

    console.log('Email sent successfully:', message);

    return new Response(JSON.stringify({ success: true, message }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Could not send email:", err);
    console.error("Error details:", JSON.stringify(err, null, 2));
    return new Response(JSON.stringify({ 
      error: err.message,
      details: err.response?.body || 'No additional details available'
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
