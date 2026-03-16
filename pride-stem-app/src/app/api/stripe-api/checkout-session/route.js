import { NextResponse } from "next/server";
import { env } from "process";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { occupation } = await request.json();

    const id = {
     student: process.env.PRICE_ID_STUDENT,
      postdoc: process.env.PRICE_ID_POSTDOC,
      faculty: process.env.PRICE_ID_FACULTY,
    };

    const paymentType = id[occupation];

    if (!paymentType) {
      return NextResponse.json({ error: "Invalid occupation selected" }, { status: 400 });
    }

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price: paymentType,
          quantity: 1,
        },  
      ],
      

      /**
       * Redirect URLs after payment
       * Success: Redirects back to register page with success query params
       * Cancel: Redirects back to register page with failure query params
       * {CHECKOUT_SESSION_ID} is replaced by Stripe with actual session ID
       */
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/register?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/register?payment=failure`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
