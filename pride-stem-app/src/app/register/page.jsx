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

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { db } from "../firebaseConfig";
import { collection, addDoc, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
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
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);

  const occupationOptions = [
    { value: "student", label: "Student - CAD $50" },
    { value: "postdoc", label: "Postdoc/Early Career - CAD $100" },
    { value: "faculty", label: "Faculty/Professional - CAD $200" },
  ];

  // Check for payment result on page load
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentStatus = urlParams.get('payment');
    const sessionId = urlParams.get('session_id');

    if (paymentStatus === 'success' && sessionId) {
      finalizeRegistration(sessionId);
    } else if (paymentStatus === 'failure') {
      setShowFailureModal(true);
      // Clean URL
      window.history.replaceState({}, '', '/register');
    }
  }, []);

  // Finalize registration after successful payment
  const finalizeRegistration = async (sessionId) => {
    try {
      const q = query(
        collection(db, "registrations_pending"),
        where("sessionId", "==", sessionId)
      );
      const querySnapshot = await getDocs(q);

      for (const document of querySnapshot.docs) {
        const registrationData = document.data();
        
        // Update pending registration
        const docRef = doc(db, "registrations_pending", document.id);
        await updateDoc(docRef, {
          status: "paid",
          paidAt: new Date()
        });

        // Add to main registrations collection
        await addDoc(collection(db, "registrations"), {
          ...registrationData,
          status: "paid",
          paidAt: new Date(),
        });

        // Send confirmation email
        try {
          await sendConfirmationEmail(registrationData);
        } catch (emailError) {
          console.error('Email send failed:', emailError);
          // Don't fail registration if email fails
        }
      }

      setShowSuccessModal(true);
      // Clean URL
      window.history.replaceState({}, '', '/register');
    } catch (error) {
      console.error('Error finalizing registration:', error);
      setStatus('Registration completed but there was an error saving. Please contact support.');
    }
  };

  // Send confirmation email
  const sendConfirmationEmail = async (registrationData) => {
    const { name, email, occupation, affiliation } = registrationData;
    
    // Format occupation for display
    const occupationLabels = {
      student: "Student - CAD $50",
      postdoc: "Postdoc/Early Career - CAD $100",
      faculty: "Faculty/Professional - CAD $200"
    };

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .detail-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6; }
          .detail-row { margin: 10px 0; }
          .label { font-weight: bold; color: #1e40af; }
          .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
          .success-icon { font-size: 48px; margin-bottom: 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="success-icon">✓</div>
            <h1>Registration Confirmed!</h1>
            <p>Pride STEM Canada Conference</p>
          </div>
          <div class="content">
            <p>Dear ${name},</p>
            <p>Thank you for registering for the Pride STEM Canada annual conference. Your payment has been successfully processed and your registration is confirmed.</p>
            
            <div class="detail-box">
              <h3 style="margin-top: 0; color: #1e40af;">Registration Details</h3>
              <div class="detail-row"><span class="label">Name:</span> ${name}</div>
              <div class="detail-row"><span class="label">Email:</span> ${email}</div>
              <div class="detail-row"><span class="label">Registration Type:</span> ${occupationLabels[occupation]}</div>
              <div class="detail-row"><span class="label">Affiliation:</span> ${affiliation}</div>
              ${registrationData.dietary ? `<div class="detail-row"><span class="label">Dietary Requirements:</span> ${registrationData.dietary}</div>` : ''}
            </div>

            <p><strong>Conference Details:</strong></p>
            <ul>
              <li><strong>When:</strong> January 2026</li>
              <li><strong>Where:</strong> Dalhousie University, Halifax, Nova Scotia</li>
              <li><strong>Expected Delegates:</strong> 250+</li>
            </ul>

            <p>We will send you additional information about the conference schedule, venue details, and other important updates as the event approaches.</p>
            
            <p>If you have any questions, please don't hesitate to contact us.</p>
            
            <p>We look forward to seeing you at the conference!</p>
            
            <p>Best regards,<br>
            <strong>Pride STEM Canada Team</strong></p>
          </div>
          <div class="footer">
            <p>This is an automated confirmation email. Please do not reply to this email.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const response = await fetch('/api/resend-api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: email,
        subject: 'Conference Registration Confirmed - Pride STEM Canada',
        html: emailHtml,
        from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to send email');
    }

    return response.json();
  };

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

    // Save pending registration
    await addDoc(collection(db, "registrations_pending"), {
      ...formData,
      status: "pending",
      sessionId: session.sessionId,
      createdAt: new Date(),
    });

    // Redirect to Stripe checkout
    window.location.href = session.url;
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
    <>
      {/* Success Modal */}
      {showSuccessModal && (
        <div className={styles.modalOverlay} onClick={() => setShowSuccessModal(false)}>
          <motion.div 
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.modalIcon}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="#10b981" strokeWidth="2" fill="#d1fae5"/>
                <path d="M8 12.5l2.5 2.5L16 9" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className={styles.modalTitle}>Payment Successful!</h2>
            <p className={styles.modalMessage}>
              Thank you for registering. Your payment has been processed successfully and your registration is now complete.
            </p>
            <p className={styles.modalSubtext}>
              You will receive a confirmation email shortly with your registration details.
            </p>
            <button 
              className={styles.modalButton}
              onClick={() => setShowSuccessModal(false)}
            >
              Continue
            </button>
          </motion.div>
        </div>
      )}

      {/* Failure Modal */}
      {showFailureModal && (
        <div className={styles.modalOverlay} onClick={() => setShowFailureModal(false)}>
          <motion.div 
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.modalIcon}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="2" fill="#fee2e2"/>
                <path d="M15 9l-6 6M9 9l6 6" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h2 className={styles.modalTitle}>Payment Cancelled</h2>
            <p className={styles.modalMessage}>
              Your payment was not completed and your registration was not processed.
            </p>
            <p className={styles.modalSubtext}>
              If you'd like to register, please fill out the form and try again.
            </p>
            <button 
              className={styles.modalButton}
              onClick={() => setShowFailureModal(false)}
            >
              Try Again
            </button>
          </motion.div>
        </div>
      )}

    <div className={styles.contactPage}>
      {/* Hero Section */}
      <motion.section className={styles.heroSection} {...fadeInUp}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Conference Registration</h1>
          <p className={styles.heroSubtitle}>
            Join us in January 2026 at Dalhousie University, Halifax, Nova Scotia for Canada's premier 2SLGBTQ+ STEM gathering.
          </p>
          <div className={styles.conferenceDetails}>
            <span className={styles.detailBadge}>January 2026</span>
            <span className={styles.detailBadge}>Dalhousie University, Halifax</span>
            <span className={styles.detailBadge}>250+ Expected Delegates</span>
          </div>
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
    </>
  );
}