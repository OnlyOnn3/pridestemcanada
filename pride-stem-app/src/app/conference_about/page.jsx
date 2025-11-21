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
        <p>Join us from January *insert date* to *insert date* , 2026, at Dalhousie, where we will expect to welcome over 250 delegates from across Canada. This conference will spotlight the latest research, hear inspiring success stories, and highlight emerging leaders within the 2SLGBTQ+ STEM community. 

        The diversification of STEM fields is essential if we are to mobilize talent in Canada, drive innovation and promote discovery across all scientific fields. The conference brings together leading experts, innovators, and changemakers to explore actionable strategies for dismantling barriers to 2SLGBTQ+ success in STEM. In addition to great science, we will also hear about increasing visibility, improving recruitment and retention of queer and trans scientists, and strategies to foster truly inclusive cultures in academia, industry, and beyond.</p>
        </div>
      </motion.section>
    </div>
  );
}