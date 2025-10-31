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
    // const email = session.customer_email || session.customer_details?.email;
    const email = 'ishigamicm@gmail.com';

   try {
    const message = await resend.emails.send({
      from: 'sandbox@resend.dev',
      to: email,
      subject: 'BLAH BLAH BLAH',
      html: `<p>YOU ARE A STUDENT ATTENDING THE CONFERENCE,\n
                YOU PAID 50$</p>`,
    });
    console.log("Email sent successfully:", message);
  } catch (err) {
    console.error("Error sending email via Resend:", err);
  }

    res.status(200).json({ session, lineItems });
  } catch (err) {
    console.error('Couldnt send Email', err);
    res.status(500).json({ error: err.message });
  }
}

