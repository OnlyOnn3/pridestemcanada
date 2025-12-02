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
import styles from "./contact.module.css";

export default function ContactPage() {
  const [form, setForm] = useState({ email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setForm({ email: "", message: "" });
      } else {
        setStatus("error");
        console.error(data.error);
      }
    } catch (err) {
      setStatus("error");
      console.error(err);
    }
  };

  return (
    <div className={styles.contactPage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Get in Touch</h1>
          <p className={styles.heroSubtitle}>
            Have a question or want to get involved? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className={styles.formSectionWrapper}>
        <div className={styles.formSection}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email Address
              </label>
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

            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.label}>
                Message
              </label>
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

            <button
              type="submit"
              disabled={status === "sending"}
              className={styles.primaryButton}
            >
              {status === "sending" ? (
                <span className={styles.buttonContent}>
                  <span className={styles.spinner}></span>
                  Sending...
                </span>
              ) : (
                "Send Message"
              )}
            </button>

            {status === "success" && (
              <div className={styles.successMessage}>
                Message sent! We'll get back to you soon.
              </div>
            )}

            {status === "error" && (
              <div className={styles.errorMessage}>
                Something went wrong. Please try again later.
              </div>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}