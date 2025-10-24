import Stripe from 'stripe';

const StripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-10-28.acacia',
});

export default async function handler(req, res)
 {
  try{
    if (req.method === 'POST') {
      const session = await StripeInstance.checkout.sessions.create({
        payment_method_types: ['card'], //add other payment methods as needed
        line_items: [
          {
            price_data: {
              currency: 'cad', 
              product_data: {
                name: 'Dummy ticket',
              },
              unit_amount: 2000, //amount in cents
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
      //   success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,//Implement when session ids and db are setup
        success_url: `${req.headers.origin}/stripe-pages/success`,
        cancel_url: `${req.headers.origin}/stripe-pages/failiure`,
      });
      res.status(200).json({sessionId: session.id});
      } else {
      res.setHeader('Allow', 'POST');
      res.status(405).end('Method Not Allowed');
    }
  } catch (error) {
    console.error('Stripe API Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}