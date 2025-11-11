/**
 * Contact Form API Route
 * 
 * This API endpoint handles contact form submissions from the /contact page.
 * It sends two emails:
 * 1. Notification email to Pride STEM team with the user's message
 * 2. Confirmation email to the user acknowledging receipt
 * 
 * Endpoint: POST /api/contact
 * 
 * Request Body:
 * {
 *   email: "user@example.com",
 *   message: "User's message content"
 * }
 * 
 * Response:
 * Success: { success: true }
 * Error: { error: "error message" }
 * 
 * Required Environment Variables:
 * - CONTACT_EMAIL: Gmail address used to send/receive contact form emails
 * - CONTACT_PASS: App-specific password for the Gmail account
 *   (See: https://support.google.com/accounts/answer/185833)
 */

import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    // Parse the incoming JSON request body
    const { email, message } = await req.json();

    // Validate that both required fields are present
    if (!email || !message) {
      return new Response(
        JSON.stringify({ error: "Missing fields" }), 
        { status: 400 }
      );
    }

    /**
     * Create email transporter using nodemailer
     * This configures the email service to use Gmail's SMTP server
     * 
     * Note: For Gmail, you need to:
     * 1. Enable 2-factor authentication on your Google account
     * 2. Generate an "App Password" specifically for this application
     * 3. Use that app password in CONTACT_PASS environment variable
     */
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.CONTACT_EMAIL, // Gmail address (e.g., info@pridestecanada.com)
        pass: process.env.CONTACT_PASS,  // Gmail app password (NOT your regular password)
      },
    });

    /**
     * EMAIL 1: Send notification to Pride STEM team
     * This email notifies the team of a new contact form submission
     */
    await transporter.sendMail({
      from: process.env.CONTACT_EMAIL,      // Sender (our email)
      to: process.env.CONTACT_EMAIL,        // Recipient (also our email - team inbox)
      subject: `New contact form submission from ${email}`,
      html: `
        <p><strong>From:</strong> ${email}</p>
        <p>${message}</p>
      `,
    });

    /**
     * EMAIL 2: Send confirmation to the user
     * This auto-reply confirms to the user that we received their message
     */
    await transporter.sendMail({
      from: process.env.CONTACT_EMAIL, // Sender (our email)
      to: email,                       // Recipient (user who submitted the form)
      subject: "Pride in STEM Canada has received your message!",
      html: `
        <p>Hi there,</p>
        <p>Thank you for contacting Pride STEM Canada. We have received your message and will get back to you as soon as possible.</p>
        <hr/>
        <p><strong>Your message:</strong></p>
        <blockquote>${message}</blockquote>
        <p>Warm regards,<br/>Pride STEM Canada Team</p>
      `,
    });

    // Both emails sent successfully
    return new Response(
      JSON.stringify({ success: true }), 
      { status: 200 }
    );
    
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ error: "Error sending email" }), 
      { status: 500 }
    );
  }
}