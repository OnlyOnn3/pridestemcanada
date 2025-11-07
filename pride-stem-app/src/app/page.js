"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./page.module.css";

const fadeInUp = {
    initial: { y: 40, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true },
    transition: { duration: 0.6 },
};

export default function HomePage() {
    return (
        <div className={styles.homepage}>
            {/* Hero Section */}
            <motion.section className={styles.heroSection} {...fadeInUp}>
                <div className={styles.heroContent}>
                    <motion.h1 
                        className={styles.heroTitle}
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        Celebrating <span className={styles.gradientText}>2SLGBTQ+</span> Voices in STEM
                    </motion.h1>
                    <motion.p 
                        className={styles.heroSubtitle}
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Join Canada's premier conference for LGBTQ2+ professionals and students in Science, Technology, Engineering, and Mathematics
                    </motion.p>
                    <motion.div 
                        className={styles.heroCTA}
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <Link href="/register" className={styles.ctaPrimary}>Register Now</Link>
                        <Link href="/about" className={styles.ctaSecondary}>Learn More</Link>
                    </motion.div>
                </div>
            </motion.section>

            {/* Current Events Section */}
            <motion.section className={styles.eventsSection} {...fadeInUp}>
                <div className={styles.sectionContainer}>
                    <h2 className={styles.sectionTitle}>Current Events</h2>
                    <div className={styles.eventsGrid}>
                        <motion.div 
                            className={styles.eventCard}
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className={styles.eventDate}>
                                <span className={styles.eventMonth}>TBA</span>
                                <span className={styles.eventDay}>2025</span>
                            </div>
                            <div className={styles.eventContent}>
                                <h3>6th Annual Canadian 2SLGBTQ+ in STEM Conference</h3>
                                <p className={styles.eventLocation}>📍 Toronto, Ontario</p>
                                <p>Join us for our flagship annual conference celebrating diversity and excellence in STEM fields. Network with professionals, attend workshops, and hear from inspiring speakers.</p>
                                <Link href="/register" className={styles.eventLink}>Learn More →</Link>
                            </div>
                        </motion.div>
                        <motion.div 
                            className={styles.eventCard}
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <div className={styles.eventDate}>
                                <span className={styles.eventMonth}>Ongoing</span>
                                <span className={styles.eventDay}>2025</span>
                            </div>
                            <div className={styles.eventContent}>
                                <h3>Call for Speakers & Volunteers</h3>
                                <p className={styles.eventLocation}>📢 Nationwide</p>
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
