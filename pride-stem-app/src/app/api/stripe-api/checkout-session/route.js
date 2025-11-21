/**
 * Stripe Checkout Session API Route
 * 
 * This API endpoint creates a Stripe checkout session for conference registration payments.
 * 
 * Endpoint: POST /api/stripe-api/checkout-session
 * 
 * Request Body:
 * {
 *   occupation: "student" | "postdoc" | "faculty"
 * }
 * 
 * Response:
 * Success: { sessionId: "cs_test_..." }
 * Error: { error: "error message" }
 * 
 * Pricing Structure (in cents for Stripe API):
 * - student: 5000 cents = $50.00 CAD
 * - postdoc: 10000 cents = $100.00 CAD
 * - faculty: 20000 cents = $200.00 CAD
 * 
 * Required Environment Variables:
 * - STRIPE_SECRET_KEY: Your Stripe secret key for server-side operations
 * - NEXT_PUBLIC_BASE_URL: Your website's base URL for redirect URLs
 * 
 * Flow:
 * 1. Client sends occupation type
 * 2. Server determines price based on occupation
 * 3. Creates Stripe checkout session
 * 4. Returns session ID to client
 * 5. Client redirects to Stripe-hosted payment page
 */

import { NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe with secret key from environment variables
// This must be the SECRET key, not the publishable key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    // Extract occupation from the request body
    const { occupation } = await request.json();

    /**
     * Price mapping based on attendee occupation
     * Stripe requires amounts in the smallest currency unit (cents for CAD)
     * So $50 = 5000 cents
     */
    const prices = {
      student: 5000,   // $50.00 CAD
      postdoc: 10000,  // $100.00 CAD
      faculty: 20000,  // $200.00 CAD
    };

    // Get the appropriate price for the selected occupation
    const amount = prices[occupation] || 0;

    // Validate that a valid occupation was provided
    if (!amount) {
      return NextResponse.json(
        { error: "Invalid occupation selected" }, 
        { status: 400 }
      );
    }

    /**
     * Create a Stripe Checkout Session
     * This generates a secure, hosted payment page on Stripe's servers
     */
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"], // Accept credit/debit cards
      mode: "payment", // One-time payment (not subscription)
      
      // Line items - what the customer is purchasing
      line_items: [
        {
          price_data: {
            currency: "cad", // Canadian dollars
            product_data: {
              name: `${occupation} Registration`, // e.g., "student Registration"
            },
            unit_amount: amount, // Price in cents
          },
          quantity: 1, // One registration per checkout
        },
      ],
      
      /**
       * Redirect URLs after payment
       * Both success and failure redirect to /conference with query parameters
       * The conference page will display appropriate alert based on payment status
       * {CHECKOUT_SESSION_ID} is replaced by Stripe with actual session ID
       */
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/conference?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/conference?payment=failure`,
    });

    // Return the session ID to the client
    // Client will use this to redirect to Stripe's checkout page
    return NextResponse.json({ sessionId: session.id });
    
  } catch (error) {
    // Log error for debugging and return error response
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: error.message }, 
      { status: 500 }
    );
  }
}
