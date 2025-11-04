"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { loadStripe } from "@stripe/stripe-js";
import React, { useState } from "react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

async function createCheckout(occupation) {
  const stripe = await stripePromise;
  const response = await fetch("/api/stripe-api/checkout-session/create-checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ occupation }),
  });

  let session;
  try {
    session = await response.json();
    console.log('Checkout Session:', session);
  } catch (err) {
    console.error('Failed to parse JSON:', err);
  }

  if (!response.ok) {
    console.error('Error creating checkout session:', session.error || session);
    return;
  }

  const result = await stripe.redirectToCheckout({ sessionId: session.sessionId });
  if (result.error) {
    console.error('Stripe redirect error:', result.error.message);
  }
}

export default function Home() {
  const [occupation, setOccupation] = useState("student");

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>BUTTON Test</h1>
        <h2>Select your occupation:</h2>
        <select className={styles.occupationSelection} value={occupation} onChange={(e) => setOccupation(e.target.value)}>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="temp">Temp</option>
        </select>
        <button onClick={() => createCheckout(occupation)}>Checkout</button>
      </main>
    </div>
  );
}
