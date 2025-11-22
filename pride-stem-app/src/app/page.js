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
import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./page.module.css";
import ImageSlider from "./ImageSlider";

const fadeInUp = {
  initial: { y: 40, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function HomePage() {
  return (
    <div className={styles.homepage}>
      {/* Hero Section*/}
      <motion.section className={styles.heroSection} {...fadeInUp}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Celebrating <span className={styles.gradientText}>2SLGBTQ+</span> in STEM
          </h1>
          <p className={styles.heroSubtitle}>
            Join Canada’s premier conference for 2SLGBTQ+ professionals and students
            in Science, Technology, Engineering, and Mathematics.
          </p>

          <div className={styles.heroCTA}>
            <Link href="/about" className={styles.primaryButton}>
              Learn More
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Image Slider */}
      <ImageSlider />
    </div>
  );
}