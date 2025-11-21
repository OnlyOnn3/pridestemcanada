import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { email, message } = await req.json();

    if (!email || !message) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
      });
    }

    await resend.emails.send({
      from: process.env.RESEND_SANDBOX_EMAIL,
      to: process.env.SENDER_EMAIL,
      subject: "Pride in STEM Canada has received your message!",
      html: `
        <p>Hi there,</p>
        <p>Thank you for contacting Pride in STEM Canada. We have received your message and will get back to you as soon as possible.</p>
        <hr/>
        <p><strong>Your message:</strong></p>
        <blockquote>${message}</blockquote>
        <p>Warm regards,<br/>Pride in STEM Canada Team</p>
      `,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });

  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ error: "Error sending email" }), {
      status: 500,
    });
  }
}
