/**
 * Vendors/Sponsors Page Component
 * 
 * This page is for organizations interested in becoming conference sponsors.
 * 
 * Features:
 * - Overview of sponsorship benefits
 * - Inquiry form for potential sponsors
 * - Form submission to /api/vendor endpoint
 * - Success/error status messages
 * 
 * Form Flow:
 * 1. Organization representative fills out email and inquiry message
 * 2. Form submits via POST to /api/vendor
 * 3. API sends two emails (one to team, one confirmation to sponsor)
 * 4. Success or error message displayed
 * 
 * Benefits Grid displays:
 * - Network with Talent
 * - Brand Visibility
 * - Speaking Opportunities
 * - Meaningful Impact
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./vendors.module.css";

export default function PartnerPage() {
    /**
     * Form state - stores email and message values
     */
    const [form, setForm] = useState({ email: "", message: "" });
    
    /**
     * Status state - tracks form submission state
     * Values: "" (initial) | "sending" (in progress) | "success" | "error"
     */
    const [status, setStatus] = useState("");

    /**
     * Handle input field changes
     * Updates the form state as user types
     * 
     * @param {Event} e - The input change event
     */
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    /**
     * Handle form submission
     * Sends vendor inquiry to API endpoint
     * 
     * @param {Event} e - The form submit event
     */
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        setStatus("sending"); // Show loading state

        try {
            // === SEND TO VENDOR API ENDPOINT ===
            // POST request to vendor API with sponsor's email and inquiry
            const res = await fetch("/api/vendor", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            // === HANDLE RESPONSE ===
            if (res.ok) {
                // Success - emails sent to both team and sponsor
                setStatus("success");
                setForm({ email: "", message: "" }); // Clear form
            } else {
                // Error from API
                setStatus("error");
                console.error(data.error);
            }
        } catch (err) {
            // Network or unexpected error
            setStatus("error");
            console.error(err);
        }
    };

    return (
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
                <h1>Become a Partner</h1>
                <p>Want to be a vendor at our 2026 Conference? Contact us!</p>
            </div>

            <div className={styles.content}>
               

                {/* Form Section */}
                <div className={styles.formWrapper}>
                    <div className={styles.formSection}>
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.formGroup}>
                                <label htmlFor="email" className={styles.label}>Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    required
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="your@company.com"
                                    className={styles.input}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="message" className={styles.label}>Message</label>
                                <textarea
                                    name="message"
                                    id="message"
                                    rows="6"
                                    required
                                    value={form.message}
                                    onChange={handleChange}
                                    placeholder="Tell us about your organization, interests, and how you'd like to support Pride STEM..."
                                    className={styles.textarea}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status === "sending"}
                                className={styles.submitBtn}
                            >
                                {status === "sending" ? "Sending..." : "Submit Inquiry"}
                            </button>

                            {status === "success" && (
                                <div className={styles.successMessage}>
                                    Thank you! We'll contact you soon to discuss sponsorship opportunities.
                                </div>
                            )}

                            {status === "error" && (
                                <div className={styles.errorMessage}>
                                    Something went wrong. Please try again later.
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}