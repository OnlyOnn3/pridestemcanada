/**
 * Conference Contact Page
 * 
 * Contact form and information specific to the Pride STEM Canada Conference.
 * Route: /conference/contact
 */

"use client";

import { useState } from "react";
import styles from "../../register/register.module.css";

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
            // TODO: Implement actual form submission logic
            // For now, just simulate a submission
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            setSubmitStatus("success");
            setFormData({ name: "", email: "", subject: "", message: "" });
        } catch (error) {
            setSubmitStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Conference Contact</h1>
                <p>Get in touch with the conference organizing team</p>
            </div>

            <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
                
                {/* Contact Information */}
                <section style={{ marginBottom: '3rem' }}>
                    <h2 style={{ color: '#1a1a1a', marginBottom: '1rem' }}>Have Questions?</h2>
                    <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                        Whether you're interested in attending, presenting, or partnering with us, 
                        we'd love to hear from you. Fill out the form below and our team will get back to you soon.
                    </p>
                </section>

                {/* Contact Form */}
                <form onSubmit={handleSubmit} className={styles.form}>
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
                            <option value="registration">Registration Question</option>
                            <option value="presentation">Presentation Submission</option>
                            <option value="partnership">Partnership Inquiry</option>
                            <option value="general">General Question</option>
                            <option value="other">Other</option>
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
                            placeholder="How can we help you?"
                        />
                    </div>

                    {submitStatus === "success" && (
                        <div style={{ 
                            background: '#d4edda', 
                            color: '#155724', 
                            padding: '1rem', 
                            borderRadius: '4px',
                            marginBottom: '1rem',
                            border: '1px solid #c3e6cb'
                        }}>
                            Thank you for your message! We'll get back to you soon.
                        </div>
                    )}

                    {submitStatus === "error" && (
                        <div style={{ 
                            background: '#f8d7da', 
                            color: '#721c24', 
                            padding: '1rem', 
                            borderRadius: '4px',
                            marginBottom: '1rem',
                            border: '1px solid #f5c6cb'
                        }}>
                            Something went wrong. Please try again.
                        </div>
                    )}

                    <button
                        type="submit"
                        className={styles.submitBtn}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                </form>
            </div>
        </div>
    );
}
