import { Resend } from 'resend';
import Stripe from 'stripe';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  const { sessionId } = req.query;

  if (!sessionId) return res.status(400).json({ error: 'Missing sessionId' });

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const lineItems = await stripe.checkout.sessions.listLineItems(sessionId);
    const email = session.customer_email || "mn334860@dal.ca";

    await resend.emails.send({
      from: 'ishigamicm@gmail.com',
      to: email,
      subject: 'Payment Confirmation',
      html: `<p>Here are the Event Details</p>`,
    });

    res.status(200).json({ session, lineItems });
  } catch (err) {
    console.error('Couldnt send Email', err);
    res.status(500).json({ error: err.message });
  }
}

