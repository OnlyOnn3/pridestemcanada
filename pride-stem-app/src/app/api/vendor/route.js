import nodemailer from "nodemailer";

export async function POST(request) {
    try {
        const { email, message } = await request.json();

        if (!email || !message) {
            return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.VENDOR_EMAIL,
                pass: process.env.VENDOR_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.VENDOR_EMAIL,
            to: process.env.VENDOR_EMAIL,
            subject: `New contact form submission from ${email}`,
            html: `<p><strong>From:</strong> ${email}</p><p>${message}</p>`,
        });

        await transporter.sendMail({
            from: process.env.VENDOR_EMAIL,
            to: email,
            subject: "Pride in STEM Canada has received your message!",
            html: `<p>Hi there,</p>
        <p>Thank you for contacting Pride STEM Canada. We have received your message and will get back to you as soon as possible.</p>
        <hr/>
        <p><strong>Your message:</strong></p>
        <blockquote>${message}</blockquote>
        <p>Warm regards,<br/>Pride STEM Canada Team</p>`,
        });

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        console.error("Error sending email:", error);
        return new Response(JSON.stringify({ error: "Error sending email" }), { status: 500 });
    }
}