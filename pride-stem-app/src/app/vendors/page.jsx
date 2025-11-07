"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./vendors.module.css";

export default function VendorPage() {
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
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
                <h1>Become a Sponsor</h1>
                <p>Partner with Pride STEM Canada and support the next generation of LGBTQ2+ professionals in STEM.</p>
            </div>

            <div className={styles.content}>
                {/* Benefits Section */}
                <div className={styles.benefitsSection}>
                    <h2>Sponsorship Benefits</h2>
                    <div className={styles.benefitsGrid}>
                        {[
                            {
                                icon: "👥",
                                title: "Network with Talent",
                                desc: "Connect with 500+ talented LGBTQ2+ professionals and students in STEM"
                            },
                            {
                                icon: "📢",
                                title: "Brand Visibility",
                                desc: "Showcase your company's commitment to diversity and inclusion"
                            },
                            {
                                icon: "🎤",
                                title: "Speaking Opportunities",
                                desc: "Present your company or research to an engaged audience"
                            },
                            {
                                icon: "🤝",
                                title: "Meaningful Impact",
                                desc: "Support initiatives that celebrate and advance LGBTQ2+ voices in STEM"
                            },
                        ].map((benefit, idx) => (
                            <div key={idx} className={styles.benefitCard}>
                                <div className={styles.icon}>{benefit.icon}</div>
                                <h3>{benefit.title}</h3>
                                <p>{benefit.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Form Section */}
                <div className={styles.formWrapper}>
                    <div className={styles.formSection}>
                        <h2>Tell Us About Your Organization</h2>
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
                                    placeholder="Tell us about your organization, sponsorship interests, and how you'd like to support Pride STEM..."
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
                                    ✓ Thank you! We'll contact you soon to discuss sponsorship opportunities.
                                </div>
                            )}

                            {status === "error" && (
                                <div className={styles.errorMessage}>
                                    ✗ Something went wrong. Please try again later.
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}