/**
 * Present Page Component
 * 
 **/

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./present.module.css";

const fadeInUp = {
  initial: { y: 40, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function PresentPage() {
  return (
    <div className={styles.presentPage}>
      {/* Hero Section */}
      <motion.section className={styles.heroSection} {...fadeInUp}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Present</h1>
          <p className={styles.heroSubtitle}>
            Check out our dynamic and diverse array of presentaitons at this year's 2SLGBTQ+ in STEM Conference
          </p>
        </div>
      </motion.section>

      <motion.section className={styles.formSectionWrapper} {...fadeInUp}>
        <div className={styles.presentSection}>
        <p>Present here</p>
        </div>
      </motion.section>
    </div>
  );
}