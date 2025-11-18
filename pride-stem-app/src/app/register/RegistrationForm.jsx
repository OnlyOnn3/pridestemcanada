/**
 * Conference Registration Form Component (RegistrationForm.jsx)
 * 
 * This is the main registration form for the Pride STEM Canada annual conference.
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
import { db } from "../firebaseConfig"; // Firebase database instance
import { collection, addDoc } from "firebase/firestore"; // Firestore functions for adding documents
import { loadStripe } from "@stripe/stripe-js"; // Stripe SDK for payment processing
import styles from "./register.module.css";

// Initialize Stripe with the publishable key from environment variables
// This promise resolves to the Stripe object used later for checkout
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function RegistrationForm() {
    /**
     * Form state object - stores all form field values
     * Each property corresponds to a form input field
     */
    const [formData, setFormData] = useState({
        name: "",          // Attendee's full/preferred name
        email: "",         // Contact email
        occupation: "",    // Student/Postdoc/Faculty - determines pricing
        affiliation: "",   // University or organization name
        dietary: "",       // Optional dietary restrictions
    });

    // Loading state - true when form is being submitted/payment is processing
    const [isLoading, setIsLoading] = useState(false);
    
    // Error message state - displays validation or processing errors to user
    const [error, setError] = useState("");

    /**
     * Handle input changes for all form fields
     * Updates the formData state and clears any existing error messages
     * 
     * @param {Event} e - The input change event
     */
    const handleChange = (e) => {
        const {name, value} = e.target;
        // Spread operator (...prev) keeps existing values, updates changed field
        setFormData((prev) => ({...prev, [name]: value}));
        setError(""); // Clear error when user starts typing
    };

    /**
     * Handle form submission
     * Validates form data, creates Stripe checkout session, saves to Firebase,
     * and redirects to Stripe payment page
     * 
     * @param {Event} e - The form submit event
     */
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default browser form submission
        
        // === CLIENT-SIDE VALIDATION ===
        // Check that all required fields are filled out
        if (!formData.name.trim()) {
            setError("Full name is required");
            return;
        }
        if (!formData.email.trim()) {
            setError("Email is required");
            return;
        }
        if (!formData.occupation) {
            setError("Please select an occupation");
            return;
        }
        if (!formData.affiliation.trim()) {
            setError("Organization/Affiliation is required");
            return;
        }

     

        setIsLoading(true); // Show loading state to user
        
        try {
            // === STEP 1: CREATE STRIPE CHECKOUT SESSION ===
            // Call our API endpoint to create a Stripe checkout session
            // This returns a sessionId we'll use to redirect to Stripe
            const response = await fetch("/api/stripe-api/checkout-session", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ occupation: formData.occupation }), // Sends occupation to determine pricing
            });

            const session = await response.json();

            // Check if the API call was successful
            if (!response.ok) {
                console.error("Error creating checkout session:", session.error);
                setError("Payment initialization failed. Please try again.");
                setIsLoading(false);
                return;
            }

            // === STEP 2: SAVE PENDING REGISTRATION TO FIREBASE ===
            // Store registration data with "pending" status
            // This will be updated to "paid" after successful payment
            await addDoc(collection(db, "registrations_pending"), {
                ...formData,           // All form fields (name, email, occupation, etc.)
                status: "pending",     // Payment not yet completed
                sessionId: session.sessionId, // Link to Stripe session for tracking
                createdAt: new Date(), // Timestamp of registration attempt
            });

            // === STEP 3: REDIRECT TO STRIPE CHECKOUT ===
            // Use Stripe SDK to redirect user to secure Stripe payment page
            const stripe = await stripePromise;
            const { error: stripeError } = await stripe.redirectToCheckout({ 
                sessionId: session.sessionId 
            });
            
            // If redirect fails, show error to user
            if (stripeError) {
                console.error("Stripe error", stripeError.message);
                setError("Payment error. Please try again.");
            }

        } catch (error) {
            // Catch any unexpected errors during the process
            console.error("Registration error: ", error);
            setError("Registration failed. Please try again later.");
        } finally {
            // Always turn off loading state when done
            setIsLoading(false);
        }
    };

    /**
     * Occupation options for the dropdown menu
     * Value is sent to backend, label is displayed to user with pricing
     */
    const occupationOptions = [
        { value: "student", label: "Student - CAD $50" },
        { value: "postdoc", label: "Postdoc/Early Career - CAD $100" },
        { value: "faculty", label: "Faculty/Professional - CAD $200" },
    ];

    return (
        <div className={styles.container}>
            {/* Form Header */}
            <div className={styles.header}>
                <h1>Conference Registration</h1>
                <p>Join us for the 6th Annual Canadian 2SLGBTQ+ in STEM Conference in Toronto</p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGrid}>
                    
                    {/* === NAME FIELD === */}
                    <div className={styles.formGroup}>
                        <label htmlFor="name-input" className={styles.label}>
                            Full Name <span className={styles.required}>*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name-input"
                            className={styles.input}
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your name (preferred name is fine)"
                            required
                        />
                        <small className={styles.helperText}>This can be your preferred name.</small>
                    </div>

                    {/* === EMAIL FIELD === */}
                    <div className={styles.formGroup}>
                        <label htmlFor="email-input" className={styles.label}>
                            Email Address <span className={styles.required}>*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email-input"
                            className={styles.input}
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your@email.com"
                            required
                        />
                    </div>

                    {/* === OCCUPATION DROPDOWN === */}
                    {/* This field determines the registration price */}
                    <div className={styles.formGroup}>
                        <label htmlFor="occupation-input" className={styles.label}>
                            Occupation <span className={styles.required}>*</span>
                        </label>
                        <select
                            name="occupation"
                            id="occupation-input"
                            className={styles.select}
                            value={formData.occupation}
                            onChange={handleChange}
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

                    {/* === AFFILIATION/ORGANIZATION FIELD === */}
                    <div className={styles.formGroup}>
                        <label htmlFor="affiliation-input" className={styles.label}>
                            Organization/Affiliation <span className={styles.required}>*</span>
                        </label>
                        <input
                            type="text"
                            name="affiliation"
                            id="affiliation-input"
                            className={styles.input}
                            value={formData.affiliation}
                            onChange={handleChange}
                            placeholder="e.g., University of Toronto, Company XYZ"
                            required
                        />
                    </div>
                </div>

                {/* === DIETARY RESTRICTIONS TEXTAREA === */}
                {/* Optional field for catering planning */}
                <div className={styles.formGroup}>
                    <label htmlFor="dietary-input" className={styles.label}>
                        Dietary Restrictions or Preferences
                    </label>
                    <textarea
                        name="dietary"
                        id="dietary-input"
                        className={styles.textarea}
                        rows="4"
                        placeholder="e.g., Vegetarian, gluten-free, allergies..."
                        value={formData.dietary}
                        onChange={handleChange}
                    ></textarea>
                    <small className={styles.helperText}>Optional - helps us plan the catering better</small>
                </div>

                {/* === ERROR MESSAGE DISPLAY === */}
                {/* Only shown when error state is not empty */}
                {error && (
                    <div className={styles.errorMessage}>
                        <span>⚠</span> {error}
                    </div>
                )}

                {/* === SUBMIT BUTTON === */}
                {/* Disabled during loading state to prevent double submissions */}
                <button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={isLoading}
                >
                    {isLoading ? "Processing..." : "Proceed to Payment"}
                </button>

                {/* Disclaimer text */}
                <p className={styles.disclaimer}>
                    You will be redirected to a secure payment page to complete your registration.
                </p>
            </form>
        </div>
    );
}