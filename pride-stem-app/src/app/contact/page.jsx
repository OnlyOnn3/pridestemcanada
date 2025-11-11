/**
 * Contact Page Component
 * 
 * This page allows visitors to send messages to the Pride STEM Canada team.
 * 
 * Features:
 * - Contact form with email and message fields
 * - Form submission to /api/contact endpoint
 * - Success/error status messages
 * - Contact information and office hours display
 * - Social media links
 * 
 * Form Flow:
 * 1. User fills out email and message
 * 2. Form submits via POST to /api/contact
 * 3. API sends two emails (one to team, one confirmation to user)
 * 4. Success or error message displayed
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./contact.module.css";

export default function ContactPage() {
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
   * Sends contact form data to API endpoint
   * 
   * @param {Event} e - The form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setStatus("sending"); // Show loading state

    try {
      // === SEND TO API ENDPOINT ===
      // POST request to contact API with email and message
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      // === HANDLE RESPONSE ===
      if (res.ok) {
        // Success - emails sent
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
      
      {/* === HEADER SECTION === */}
      <div className={styles.header}>
        <h1>Get in Touch</h1>
        <p>Have a question? We'd love to hear from you. Send us a message!</p>
      </div>

      <div className={styles.content}>
        
        {/* === CONTACT FORM SECTION === */}
        <div className={styles.formSection}>
          <form onSubmit={handleSubmit} className={styles.form}>
            
            {/* Email Input */}
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>Email Address</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={styles.input}
              />
            </div>

            {/* Message Textarea */}
            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.label}>Message</label>
              <textarea
                name="message"
                id="message"
                rows="6"
                required
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us how we can help..."
                className={styles.textarea}
              />
            </div>

            {/* Submit Button */}
            {/* Disabled during submission to prevent duplicate sends */}
            <button
              type="submit"
              disabled={status === "sending"}
              className={styles.submitBtn}
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>

            {/* Success Message */}
            {status === "success" && (
              <div className={styles.successMessage}>
                Message sent! We'll get back to you soon.
              </div>
            )}

            {/* Error Message */}
            {status === "error" && (
              <div className={styles.errorMessage}>
                Something went wrong. Please try again later.
              </div>
            )}
          </form>
        </div>

        {/* === CONTACT INFORMATION SECTION === */}
        {/* Display organization contact details and office hours */}
        <div className={styles.infoSection}>
          
          {/* Contact Info Card */}
          <div className={styles.infoCard}>
            <h3>Contact Info</h3>
            <p>
              <strong>Email:</strong><br />
              <a href="mailto:info@pridestecanada.com">info@pridestecanada.com</a>
            </p>
            <p>
              <strong>Location:</strong><br />
              Toronto, Canada
            </p>
          </div>

          {/* Office Hours Card */}
          <div className={styles.infoCard}>
            <h3>Office Hours</h3>
            <p>
              Monday - Friday<br />
              9:00 AM - 5:00 PM EST
            </p>
          </div>

          {/* Social Media Links Card */}
          <div className={styles.infoCard}>
            <h3>Follow Us</h3>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink}>Facebook</a>
              <a href="#" className={styles.socialLink}>Twitter</a>
              <a href="#" className={styles.socialLink}>Instagram</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}