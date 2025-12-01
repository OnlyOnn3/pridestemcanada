/**
 * Schedule Page Component
 * 
 **/

"use client";

import { motion } from "framer-motion";
import styles from "./schedule.module.css";

const fadeInUp = {
  initial: { y: 40, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function SchedulePage() {
  return (
    <div className={styles.schedulePage}>
      {/* Hero Section */}
      <motion.section className={styles.heroSection} {...fadeInUp}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Conference Schedule</h1>
          <p className={styles.heroSubtitle}>
            Please see the conference schedule below to ensure you don't miss it!
          </p>
        </div>
      </motion.section>

      <motion.section className={styles.heroSection} {...fadeInUp}>
        <div className={styles.heroContent}>
          <h2 className={styles.heroTitle}>
            Registration
          </h2>
          <p className={styles.heroSubtitle}></p>
          <h2 className={styles.heroTitle}>
            Talks
          </h2>
          <p className={styles.heroSubtitle}>
            The talks
          </p>
          <img src="/img/schedule.png" alt="test" />
        </div>
      </motion.section>
    </div>
  );
}