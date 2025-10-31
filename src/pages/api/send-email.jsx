'use client';
import { Resend } from 'resend';
import { useEffect } from 'react';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export default function resendEmail({email}) {
 useEffect(() => {
    if (!email) return;
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
}, [email]);

return null;
}