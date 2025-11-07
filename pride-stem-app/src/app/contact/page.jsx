"use client";

import { useState } from "react";
import Link from "next/link";
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
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1>Get in Touch</h1>
        <p>Have a question? We'd love to hear from you. Send us a message!</p>
      </div>

      <div className={styles.content}>
        {/* Contact Form */}
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
                placeholder="you@example.com"
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
                placeholder="Tell us how we can help..."
                className={styles.textarea}
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className={styles.submitBtn}
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>

            {status === "success" && (
              <div className={styles.successMessage}>
                ✓ Message sent! We'll get back to you soon.
              </div>
            )}

            {status === "error" && (
              <div className={styles.errorMessage}>
                ✗ Something went wrong. Please try again later.
              </div>
            )}
          </form>
        </div>

        {/* Info Section */}
        <div className={styles.infoSection}>
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

          <div className={styles.infoCard}>
            <h3>Office Hours</h3>
            <p>
              Monday - Friday<br />
              9:00 AM - 5:00 PM EST
            </p>
          </div>

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