/**
 * Schedule Page Component
 * 
 **/

"use client";

import { useState } from "react";
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

      <motion.section className={styles.formSectionWrapper} {...fadeInUp}>
        <div className={styles.scheduleSection}>
        <p>Schedule here</p>
        </div>
      </motion.section>
    </div>
  );
}