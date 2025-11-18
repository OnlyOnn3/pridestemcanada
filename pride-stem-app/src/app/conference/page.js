"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./conference.module.css";

const fadeInUp = {
  initial: { y: 40, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function ConferencePage() {
  return (
    <div className={styles.conferencePage}>
      {/* Hero Section */}
      <motion.section className={styles.heroSection} {...fadeInUp}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Pride in STEM Canada Conference</h1>
          <p className={styles.heroSubtitle}>
            Join us for the Annual Canadian 2SLGBTQ+ in STEM Conference!
          </p>
        </div>
      </motion.section>
 
          {/* Conference Action Buttons */}
          <div className={styles.buttonGroup}>
             <Link href="/register" className={styles.heroButton}>
              Register
            </Link>
            <Link href="/schedule" className={styles.heroButton}>
              Schedule
            </Link>
             <Link href="/present" className={styles.heroButton}>
              Present
            </Link>
            <Link href="/partner" className={styles.heroButton}>
              Partner
            </Link>
            <Link href="/contact" className={styles.heroButton}>
              Contact Us
            </Link>
          </div>
    </div>
  );
}