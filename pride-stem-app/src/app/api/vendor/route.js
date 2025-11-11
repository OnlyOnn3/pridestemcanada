/**
 * Vendor/Sponsor Inquiry API Route
 * 
 * This API endpoint handles sponsor/vendor inquiry form submissions from the /vendors page.
 * Similar to the contact form, it sends two emails:
 * 1. Notification email to Pride STEM team about the sponsorship inquiry
 * 2. Confirmation email to the potential sponsor acknowledging receipt
 * 
 * Endpoint: POST /api/vendor
 * 
 * Request Body:
 * {
 *   email: "sponsor@company.com",
 *   message: "Sponsorship inquiry details"
 * }
 * 
 * Response:
 * Success: { success: true }
 * Error: { error: "error message" }
 * 
 * Required Environment Variables:
 * - VENDOR_EMAIL: Gmail address for vendor/sponsor communications
 * - VENDOR_PASS: App-specific password for the Gmail account
 *   (See: https://support.google.com/accounts/answer/185833)
 * 
 * Note: This could be the same or different from CONTACT_EMAIL depending on
 * whether you want sponsor inquiries to go to a separate inbox
 */

import nodemailer from "nodemailer";

export async function POST(request) {
    try {
        // Parse the incoming JSON request body
        const { email, message } = await request.json();

        // Validate that both required fields are present
        if (!email || !message) {
            return new Response(
                JSON.stringify({ error: "Missing fields" }), 
                { status: 400 }
            );
        }

        /**
         * Create email transporter using nodemailer
         * Configured to use Gmail's SMTP server for sending emails
         * 
         * Setup Requirements:
         * 1. Enable 2-factor authentication on Gmail account
         * 2. Generate an "App Password" for this application
         * 3. Store app password in VENDOR_PASS environment variable
         */
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.VENDOR_EMAIL, // Gmail address for sponsor inquiries
                pass: process.env.VENDOR_PASS,  // Gmail app password (NOT regular password)
            },
        });

        /**
         * EMAIL 1: Send notification to Pride STEM team
         * This alerts the team about a new sponsorship inquiry
         */
        await transporter.sendMail({
            from: process.env.VENDOR_EMAIL,       // Sender (our email)
            to: process.env.VENDOR_EMAIL,         // Recipient (team inbox for sponsor inquiries)
            subject: `New contact form submission from ${email}`,
            html: `
                <p><strong>From:</strong> ${email}</p>
                <p>${message}</p>
            `,
        });

        /**
         * EMAIL 2: Send confirmation to the potential sponsor
         * This auto-reply confirms we received their sponsorship inquiry
         */
        await transporter.sendMail({
            from: process.env.VENDOR_EMAIL, // Sender (our email)
            to: email,                      // Recipient (potential sponsor who submitted the form)
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