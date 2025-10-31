import { Resend } from 'resend';
import Stripe from 'stripe';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function getCheckoutDetails(id) {
    if (!sessionId) throw new Error('Missing session ID');
    const sessionId = await stripe.checkout.sessions.retrieve(id);  ; 
    const lineItems = await stripe.checkout.sessions.listLineItems(sessionId);
  return lineItems;
}
export async function resendEmail(email) {
      try {
        await resend.emails.send({
          from: 'ishigamicm@gmail.com',
          to: email?email:"mn334860@dal.ca",
          subject: 'Payment Confirmation',
          html: `<p>Here are the Event Details</p>`,
        });
      } catch (err) {
        console.error('Error sending email:', err);
      }
    }


