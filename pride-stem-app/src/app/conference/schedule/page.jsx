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
            Explore our full program of keynotes, presentations, workshops, and networking events
          </p>
        </div>
      </motion.section>

      {/* Schedule Image Section */}
      <motion.section className={styles.scheduleWrapper} {...fadeInUp}>
        <div className={styles.scheduleContainer}>
          <div className={styles.scheduleHeader}>
            <h2 className={styles.scheduleTitle}>Full Conference Program</h2>
            <p className={styles.scheduleDescription}>
              View the complete conference schedule below. All sessions, workshops, and networking events are listed with detailed timing and locations.
            </p>
          </div>
          
          <div className={styles.scheduleImageCard}>
            <img 
              src="/img/schedule.png" 
              alt="Conference Schedule" 
              className={styles.scheduleImage}
            />
          </div>

          <div className={styles.scheduleActions}>
            <a href="/img/schedule.png" download className={styles.downloadButton}>
              Download Schedule
            </a>
            <a href="/register" className={styles.registerButton}>
              Register Now
            </a>
          </div>
        </div>
      </motion.section>

      {/* Quick Info Section */}
      <motion.section className={styles.infoSection} {...fadeInUp}>
        <div className={styles.infoContainer}>
          <h2 className={styles.infoTitle}>Event Information</h2>
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <h3>Dates</h3>
              <p>January 2026</p>
            </div>
            <div className={styles.infoCard}>
              <h3>Location</h3>
              <p>Dalhousie University<br/>Halifax, Nova Scotia</p>
            </div>
            <div className={styles.infoCard}>
              <h3>Expected Attendance</h3>
              <p>250+ Delegates</p>
            </div>
            <div className={styles.infoCard}>
              <h3>Sessions</h3>
              <p>Keynotes, Talks & Workshops</p>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}