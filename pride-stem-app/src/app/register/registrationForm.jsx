/**
 * Registration Page 
 * 
 * This component handles both the page and the registration form for the
 * Pride STEM Canada annual conference.
 * 
 * Flow:
 * 1. User fills out registration form (name, email, occupation, affiliation, dietary needs)
 * 2. Form validates all required fields
 * 3. Creates a pending registration in Firebase
 * 4. Initiates Stripe checkout session with appropriate pricing
 * 5. Redirects user to Stripe payment page
 * 6. After payment: user redirected to success page which finalizes registration
 * 
 * Pricing (in cents for Stripe):
 * - Student: $50 CAD (5000 cents)
 * - Postdoc/Early Career: $100 CAD (10000 cents)
 * - Faculty/Professional: $200 CAD (20000 cents)
 * 
 * Required Environment Variables:
 * - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: Your Stripe public key for client-side
 */

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { loadStripe } from "@stripe/stripe-js";
import styles from "./register.module.css"; 

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const fadeInUp = {
  initial: { y: 40, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function RegistrationPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    occupation: "",
    affiliation: "",
    dietary: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(""); // "error", "success", "sending"

  const occupationOptions = [
    { value: "student", label: "Student - CAD $50" },
    { value: "postdoc", label: "Postdoc/Early Career - CAD $100" },
    { value: "faculty", label: "Faculty/Professional - CAD $200" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setStatus("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!formData.name.trim()) return setStatus("Full name is required");
    if (!formData.email.trim()) return setStatus("Email is required");
    if (!formData.occupation) return setStatus("Please select an occupation");
    if (!formData.affiliation.trim()) return setStatus("Organization/Affiliation is required");

    setIsLoading(true);
    setStatus("sending");

    try {
      // Create Stripe checkout session
      const response = await fetch("/api/stripe-api/checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ occupation: formData.occupation }),
      });
      const session = await response.json();

      if (!response.ok) {
        console.error("Stripe session error:", session.error);
        setStatus("Payment initialization failed. Please try again.");
        setIsLoading(false);
        return;
      }

      // Save pending registration to Firebase
      await addDoc(collection(db, "registrations_pending"), {
        ...formData,
        status: "pending",
        sessionId: session.sessionId,
        createdAt: new Date(),
      });

      // Redirect to Stripe checkout
      const stripe = await stripePromise;
      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId: session.sessionId,
      });
      if (stripeError) {
        console.error("Stripe error", stripeError.message);
        setStatus("Payment error. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setStatus("Registration failed. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.contactPage}>
      {/* Hero Section */}
      <motion.section className={styles.heroSection} {...fadeInUp}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Conference Registration</h1>
          <p className={styles.heroSubtitle}>
            Join us for the 6th Annual Canadian 2SLGBTQ+ in STEM Conference in Toronto.
          </p>
        </div>
      </motion.section>

      {/* Registration Form Section */}
      <motion.section className={styles.formSectionWrapper} {...fadeInUp}>
        <div className={styles.formSection}>
          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Name */}
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>
                Full Name <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name (preferred name is fine)"
                className={styles.input}
                required
              />
            </div>

            {/* Email */}
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email Address <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={styles.input}
                required
              />
            </div>

            {/* Occupation */}
            <div className={styles.formGroup}>
              <label htmlFor="occupation" className={styles.label}>
                Occupation <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <select
                name="occupation"
                id="occupation"
                value={formData.occupation}
                onChange={handleChange}
                className={styles.select}
                required
              >
                <option value="">Select your occupation...</option>
                {occupationOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
                ))}
              </select>
            </div>

            {/* Affiliation */}
            <div className={styles.formGroup}>
              <label htmlFor="affiliation" className={styles.label}>
                Organization/Affiliation <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <input
                type="text"
                name="affiliation"
                id="affiliation"
                value={formData.affiliation}
                onChange={handleChange}
                placeholder="e.g., University of Toronto, Company XYZ"
                className={styles.input}
                required
              />
            </div>

            {/* Dietary */}
            <div className={styles.formGroup}>
              <label htmlFor="dietary" className={styles.label}>
                Dietary Restrictions or Preferences
              </label>
              <textarea
                name="dietary"
                id="dietary"
                value={formData.dietary}
                onChange={handleChange}
                placeholder="e.g., Vegetarian, gluten-free, allergies..."
                className={styles.textarea}
                rows={4}
              />
            </div>

            {/* Status / Error messages */}
            {status && status !== "sending" && (
              <div
                className={
                  status.includes("failed") || status.includes("error")
                    ? styles.errorMessage
                    : styles.successMessage
                }
              >
                {status}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={styles.primaryButton}
            >
              {isLoading ? "Processing..." : "Proceed to Payment"}
            </button>

            <p style={{ fontSize: "0.9rem", color: "#6b7280", marginTop: "1rem" }}>
              You will be redirected to a secure payment page to complete your registration.
            </p>
          </form>
        </div>
      </motion.section>
    </div>
  );
}