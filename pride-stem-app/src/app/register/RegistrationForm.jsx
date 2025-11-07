"use client";

import { useState } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { loadStripe } from "@stripe/stripe-js";
import styles from "./register.module.css";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function RegistrationForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        occupation: "",
        affiliation: "",
        dietary: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
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

        setIsLoading(true);
        try {
            const response = await fetch("/api/stripe-api/checkout-session", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ occupation: formData.occupation }),
            });

            const session = await response.json();

            if (!response.ok) {
                console.error("Error creating checkout session:", session.error);
                setError("Payment initialization failed. Please try again.");
                setIsLoading(false);
                return;
            }

            await addDoc(collection(db, "registrations_pending"), {
                ...formData,
                status: "pending",
                sessionId: session.sessionId,
                createdAt: new Date(),
            });

            const stripe = await stripePromise;
            const { error: stripeError } = await stripe.redirectToCheckout({ sessionId: session.sessionId });
            if (stripeError) {
                console.error("Stripe error", stripeError.message);
                setError("Payment error. Please try again.");
            }

        } catch (error) {
            console.error("Registration error: ", error);
            setError("Registration failed. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    const occupationOptions = [
        { value: "student", label: "Student - CAD $50" },
        { value: "postdoc", label: "Postdoc/Early Career - CAD $100" },
        { value: "faculty", label: "Faculty/Professional - CAD $200" },
    ];

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Conference Registration</h1>
                <p>Join us for the 6th Annual Canadian 2SLGBTQ+ in STEM Conference in Toronto</p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGrid}>
                    {/* Name */}
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

                    {/* Email */}
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

                    {/* Occupation */}
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

                    {/* Affiliation */}
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

                {/* Dietary Restrictions */}
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

                {/* Error Message */}
                {error && (
                    <div className={styles.errorMessage}>
                        <span>⚠</span> {error}
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={isLoading}
                >
                    {isLoading ? "Processing..." : "Proceed to Payment"}
                </button>

                <p className={styles.disclaimer}>
                    You will be redirected to a secure payment page to complete your registration.
                </p>
            </form>
        </div>
    );
}