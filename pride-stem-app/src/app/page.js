/**
 * Homepage Component (page.js)
 * 
 * The main landing page for the Pride STEM Canada website.
 * Features smooth scroll animations using Framer Motion.
 * 
 * Sections:
 * 1. Hero Section - Main banner with title, subtitle, and call-to-action buttons
 * 2. Current Events Section - Displays upcoming conference and volunteer opportunities
 * 
 * Animations:
 * - fadeInUp: Elements fade in and slide up as user scrolls
 * - viewport: { once: true } means animations only trigger once
 * - Staggered delays create a cascading effect
 */

"use client";
import { motion } from "framer-motion"; // Animation library for smooth scroll effects
import Link from "next/link"; // Next.js navigation component
import styles from "./page.module.css"; // Component-specific styles

/**
 * Reusable animation configuration
 * This object defines how elements appear when scrolling into view
 * 
 * - initial: Starting state (slightly below, invisible)
 * - whileInView: End state (normal position, visible)
 * - viewport: { once: true } = animate only on first view, not every scroll
 * - transition: How long the animation takes
 */
const fadeInUp = {
    initial: { y: 40, opacity: 0 },       // Start 40px down and transparent
    whileInView: { y: 0, opacity: 1 },    // End at normal position and opaque
    viewport: { once: true },              // Only animate once
    transition: { duration: 0.6 },         // Animation lasts 0.6 seconds
};

export default function HomePage() {
    return (
        <div className={styles.homepage}>
            
            {/* === HERO SECTION === */}
            {/* Main banner section with headline and call-to-action buttons */}
            <motion.section className={styles.heroSection} {...fadeInUp}>
                <div className={styles.heroContent}>
                    
                    {/* Main Headline */}
                    {/* Custom animation with slight delay for cascading effect */}
                    <motion.h1 
                        className={styles.heroTitle}
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }} // 0.1s delay
                    >
                        Celebrating <span className={styles.gradientText}>2SLGBTQ+</span> Voices in STEM
                    </motion.h1>
                    
                    {/* Subtitle/Description */}
                    {/* Appears slightly after the headline */}
                    <motion.p 
                        className={styles.heroSubtitle}
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }} // 0.2s delay
                    >
                        Join Canada's premier conference for LGBTQ2+ professionals and students in Science, Technology, Engineering, and Mathematics
                    </motion.p>
                    
                    {/* Call-to-Action Buttons */}
                    {/* Appears last in the cascade */}
                    <motion.div 
                        className={styles.heroCTA}
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }} // 0.3s delay
                    >
                        {/* Primary action - Register for conference */}
                        <Link href="/register" className={styles.ctaPrimary}>Register Now</Link>
                        
                        {/* Secondary action - Learn more about organization */}
                        <Link href="/about" className={styles.ctaSecondary}>Learn More</Link>
                    </motion.div>
                </div>
            </motion.section>

            {/* === CURRENT EVENTS SECTION === */}
            {/* Displays upcoming conference and volunteer opportunities */}
            <motion.section className={styles.eventsSection} {...fadeInUp}>
                <div className={styles.sectionContainer}>
                    <h2 className={styles.sectionTitle}>Current Events</h2>
                    
                    {/* Grid layout for event cards - responsive (stacks on mobile) */}
                    <div className={styles.eventsGrid}>
                        
                        {/* Event Card 1: Annual Conference */}
                        <motion.div 
                            className={styles.eventCard}
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }} // No delay for first card
                        >
                            {/* Date Badge */}
                            <div className={styles.eventDate}>
                                <span className={styles.eventMonth}>TBA</span>
                                <span className={styles.eventDay}>2025</span>
                            </div>
                            
                            {/* Event Details */}
                            <div className={styles.eventContent}>
                                <h3>6th Annual Canadian 2SLGBTQ+ in STEM Conference</h3>
                                <p className={styles.eventLocation}>Toronto, Ontario</p>
                                <p>Join us for our flagship annual conference celebrating diversity and excellence in STEM fields. Network with professionals, attend workshops, and hear from inspiring speakers.</p>
                                <Link href="/register" className={styles.eventLink}>Learn More →</Link>
                            </div>
                        </motion.div>
                        
                        {/* Event Card 2: Call for Speakers & Volunteers */}
                        {/* Appears slightly after first card (0.1s delay) */}
                        <motion.div 
                            className={styles.eventCard}
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }} // 0.1s delay
                        >
                            {/* Date Badge */}
                            <div className={styles.eventDate}>
                                <span className={styles.eventMonth}>Ongoing</span>
                                <span className={styles.eventDay}>2025</span>
                            </div>
                            
                            {/* Event Details */}
                            <div className={styles.eventContent}>
                                <h3>Call for Speakers & Volunteers</h3>
                                <p className={styles.eventLocation}>Nationwide</p>
                                <p>We're looking for passionate individuals to share their stories and contribute to our mission. Applications are now open!</p>
                                <Link href="/contact" className={styles.eventLink}>Get Involved →</Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.section>
        </div>
    );
}
