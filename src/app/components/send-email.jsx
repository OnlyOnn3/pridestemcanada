import { Resend } from 'resend';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export default function resendEmail(email) {
    async function sendEmail() {
      try {
        await resend.emails.send({
          from: 'ishigamicm@gmail.com',
          to: email,
          subject: 'Payment Confirmation',
          html: `<p>Here are the Event Details</p>`,
        });
      } catch (err) {
        console.error('Error sending email:', err);
      }
    }
    resendEmail();
}


