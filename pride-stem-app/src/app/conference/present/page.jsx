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
          <h1 className={styles.heroTitle}>Present Your Research</h1>
          <p className={styles.heroSubtitle}>
            Share your work and join Canada's most dynamic gathering of 2SLGBTQ+ STEM researchers
          </p>
        </div>
      </motion.section>

      {/* Introduction */}
      <motion.section className={styles.contentWrapper} {...fadeInUp}>
        <div className={styles.contentSection}>
          <p className={styles.leadText}>
            We're proud to showcase a dynamic and diverse array of presentations at this year's 2SLGBTQ+ in STEM Conference. 
            From groundbreaking keynote talks to engaging oral and poster presentations, our program highlights the innovation, 
            brilliance, and interdisciplinary impact of 2SLGBTQ+ scholars and professionals in STEM. Submit your abstract today 
            to join our community of outstanding researchers.
          </p>
        </div>
      </motion.section>

      {/* Presentation Types */}
      <motion.section className={styles.cardsSection} {...fadeInUp}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>Presentation Formats</h2>
          <div className={styles.cardsGrid}>
            {[
              { 
                title: "Keynote Presentations", 
                desc: "Featured talks by distinguished leaders addressing major themes in 2SLGBTQ+ STEM advancement and inclusion" 
              },
              { 
                title: "Oral Presentations", 
                desc: "15-20 minute research talks showcasing original work across all STEM disciplines with Q&A sessions" 
              },
              { 
                title: "Poster Sessions", 
                desc: "Interactive poster presentations allowing for in-depth discussions and networking with attendees" 
              },
              { 
                title: "Lightning Talks", 
                desc: "Fast-paced 5-minute presentations highlighting innovative ideas and early-stage research" 
              },
            ].map((card, idx) => (
              <motion.div
                key={idx}
                className={styles.featureCard}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Benefits Section */}
      <motion.section className={styles.benefitsSection} {...fadeInUp}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>Why Present?</h2>
          <div className={styles.benefitsGrid}>
            <div className={styles.benefitItem}>
              <h4>Showcase Your Work</h4>
              <p>Share your research with an engaged and supportive community</p>
            </div>
            <div className={styles.benefitItem}>
            
              <h4>Network & Collaborate</h4>
              <p>Connect with potential collaborators and mentors in your field</p>
            </div>
            <div className={styles.benefitItem}>
              <h4>Get Feedback</h4>
              <p>Receive constructive feedback from peers and experts</p>
            </div>
            <div className={styles.benefitItem}>
              <h4>Build Your CV</h4>
              <p>Add conference presentations to your professional portfolio</p>
            </div>
            <div className={styles.benefitItem}>
              <h4>Gain Visibility</h4>
              <p>Increase your visibility in the 2SLGBTQ+ STEM community</p>
            </div>
            <div className={styles.benefitItem}>
              <h4>Professional Development</h4>
              <p>Develop your presentation and communication skills</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section className={styles.ctaSection} {...fadeInUp}>
        <div className={styles.ctaContent}>
          <h2>Ready to Present?</h2>
          <p>Submit your abstract and join our community of outstanding researchers</p>
          <div className={styles.ctaButtons}>
            <a href="/conference/contact" className={styles.primaryButton}>
              Submit Abstract
            </a>
            <a href="/conference/schedule" className={styles.secondaryButton}>
              View Schedule
            </a>
          </div>
        </div>
      </motion.section>
    </div>
  );
}