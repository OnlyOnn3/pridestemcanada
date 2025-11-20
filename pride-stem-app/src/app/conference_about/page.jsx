/**
 * Conference About Page Component
 * 
 **/

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./conference_about.module.css";

const fadeInUp = {
  initial: { y: 40, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function ConferenceAboutPage() {
  return (
    <div className={styles.conferenceAboutPage}>
      {/* Hero Section */}
      <motion.section className={styles.heroSection} {...fadeInUp}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>About the Conference</h1>
          <p className={styles.heroSubtitle}>
           Header caption
          </p>
        </div>
      </motion.section>

      <motion.section className={styles.formSectionWrapper} {...fadeInUp}>
        <div className={styles.presentSection}>
        <p>Content here</p>
        </div>
      </motion.section>
    </div>
  );
}