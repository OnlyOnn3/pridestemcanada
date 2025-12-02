"use client";
/**
 * Conference Contact Page
 * 
 * Contact form and information specific to the Pride STEM Canada Conference.
 * Route: /conference/contact
 * 
 * Features:
 * - Two-column layout with info panel and form
 * - Conference-specific contact categories
 * - Same functionality as main contact page
 * - Distinct dark hero section with pride gradient
 * - Sticky info panel with quick contact details
 */

import { useState } from "react";
import styles from "./conferenceContact.module.css";

export default function ConferenceContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          message: `Conference Contact - ${formData.subject}\n\nFrom: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
        }),
      });

      if (res.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.conferenceContactPage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Contact Us</h1>
          <p className={styles.heroSubtitle}>
            Have questions about the conference? Our team is here to help with registration, presentations, partnerships, and more.
          </p>
        </div>
      </section>

      {/* Two Column Content */}
      <section className={styles.contentSection}>
        {/* Info Panel */}
        <div className={styles.infoPanel}>
          <h2 className={styles.infoPanelTitle}>How Can We Help?</h2>
          <p className={styles.infoPanelText}>
            Whether you're interested in attending, presenting your research, or partnering with us, 
            we're excited to hear from you.
          </p>
          
          <div className={styles.infoList}>
            <div className={styles.infoItem}>
              <div className={styles.infoItemContent}>
                <h3>Registration</h3>
                <p>Questions about tickets, pricing, or registration process</p>
              </div>
            </div>
            
            <div className={styles.infoItem}>
              <div className={styles.infoItemContent}>
                <h3>Presentations</h3>
                <p>Submit your research or ask about presentation formats</p>
              </div>
            </div>
            
            <div className={styles.infoItem}>
              <div className={styles.infoItemContent}>
                <h3>Partnerships</h3>
                <p>Sponsorship opportunities and collaboration inquiries</p>
              </div>
            </div>
            
            <div className={styles.infoItem}>
              <div className={styles.infoItemContent}>
                <h3>Schedule</h3>
                <p>Event timeline, sessions, and networking events</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Panel */}
        <div className={styles.formPanel}>
          <h2 className={styles.formTitle}>Send Us a Message</h2>
          <p className={styles.formDescription}>
            Fill out the form below and we'll get back to you within 24 hours.
          </p>
          
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>
                  Name <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={styles.input}
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>
                  Email <span className={styles.required}>*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={styles.input}
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="subject" className={styles.label}>
                Subject <span className={styles.required}>*</span>
              </label>
              <select
                id="subject"
                name="subject"
                className={styles.select}
                value={formData.subject}
                onChange={handleChange}
                required
              >
                <option value="">Select a subject...</option>
                <option value="Registration Question">Registration Question</option>
                <option value="Presentation Submission">Presentation Submission</option>
                <option value="Partnership Inquiry">Partnership Inquiry</option>
                <option value="Schedule & Events">Schedule & Events</option>
                <option value="General Question">General Question</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.label}>
                Message <span className={styles.required}>*</span>
              </label>
              <textarea
                id="message"
                name="message"
                className={styles.textarea}
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                placeholder="Tell us more about your inquiry..."
              />
            </div>

            {submitStatus === "success" && (
              <div className={`${styles.statusMessage} ${styles.success}`}>
                Thank you for your message! We'll get back to you soon.
              </div>
            )}

            {submitStatus === "error" && (
              <div className={`${styles.statusMessage} ${styles.error}`}>
                Something went wrong. Please try again or email us directly.
              </div>
            )}

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className={styles.buttonContent}>
                  <span className={styles.spinner}></span>
                  Sending...
                </span>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
