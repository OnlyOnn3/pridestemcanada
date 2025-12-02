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
import styles from "./partner.module.css";

export default function PartnerPage() {
    const [form, setForm] = useState({ email: "", message: "" });
    const [status, setStatus] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("sending");

        try {
            const res = await fetch("/api/vendor", {
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
        <div className={styles.partnerPage}>
            {/* Hero Section */}
            <section className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>Become a Partner</h1>
                    <p className={styles.heroSubtitle}>
                        Support 2SLGBTQ+ inclusion in STEM while connecting with Canada's top diverse talent
                    </p>
                </div>
            </section>

            {/* Partnership Benefits */}
            <section className={styles.cardsSection}>
                <div className={styles.sectionContainer}>
                    <h2 className={styles.sectionTitle}>Partnership Benefits</h2>
                    <div className={styles.cardsGrid}>
                        {[
                            { 
                                title: "Recruit Top Talent", 
                                desc: "Connect directly with 250+ highly qualified 2SLGBTQ+ professionals and students in STEM fields" 
                            },
                            { 
                                title: "Brand Visibility", 
                                desc: "Showcase your commitment to diversity and inclusion to a national audience of STEM leaders" 
                            },
                            { 
                                title: "Thought Leadership", 
                                desc: "Position your organization as an industry leader through speaking opportunities and panels" 
                            },
                            { 
                                title: "Meaningful Impact", 
                                desc: "Support the advancement of 2SLGBTQ+ individuals in STEM and create lasting change" 
                            },
                        ].map((card, idx) => (
                            <div
                                key={idx}
                                className={styles.featureCard}
                            >
                                <h3>{card.title}</h3>
                                <p>{card.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Partnership Opportunities */}
            <section className={styles.opportunitiesSection}>
                <div className={styles.sectionContainer}>
                    <h2 className={styles.sectionTitle}>Partnership Opportunities</h2>
                    <div className={styles.opportunitiesGrid}>
                        <div className={styles.opportunityCard}>
                            <h3>Conference Sponsor</h3>
                            <p>Support the entire conference with premium branding and speaking opportunities</p>
                            <ul>
                                <li>Logo on all conference materials</li>
                                <li>Exhibition booth space</li>
                                <li>Speaking opportunity</li>
                                <li>Delegate registrations included</li>
                            </ul>
                        </div>
                        <div className={styles.opportunityCard}>
                            <h3>Session Sponsor</h3>
                            <p>Support specific sessions, workshops, or networking events aligned with your brand</p>
                            <ul>
                                <li>Brand recognition during sessions</li>
                                <li>Promotional materials distribution</li>
                                <li>Networking with session attendees</li>
                                <li>Social media recognition</li>
                            </ul>
                        </div>
                        <div className={styles.opportunityCard}>
                            <h3>Exhibitor</h3>
                            <p>Connect directly with delegates through exhibition space and recruitment opportunities</p>
                            <ul>
                                <li>Exhibition booth</li>
                                <li>Access to attendee list</li>
                                <li>Resume collection</li>
                                <li>Networking opportunities</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <section className={styles.formSectionWrapper}>
                <div className={styles.formSection}>
                    <h2>Get in Touch</h2>
                    <p style={{ textAlign: 'center', marginBottom: '2rem', color: '#6b7280' }}>
                        Want to be a partner at our 2026 Conference? We'd love to hear from you and discuss partnership opportunities.
                    </p>
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
                                placeholder="your@company.com"
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
                                placeholder="Tell us about your organization, interests, and how you'd like to support Pride STEM..."
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
                                "Submit Inquiry"
                            )}
                        </button>

                        {status === "success" && (
                            <div className={styles.successMessage}>
                                Thank you! We'll contact you soon to discuss partnership opportunities.
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