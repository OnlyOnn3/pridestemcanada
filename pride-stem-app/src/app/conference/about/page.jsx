"use client";
/**
 * Conference About Page Component
 * 
 **/



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
            Join Canada's premier gathering of 2SLGBTQ+ professionals, researchers, and students in STEM
          </p>
        </div>
      </motion.section>

      {/* Conference Overview */}
      <motion.section className={styles.contentWrapper} {...fadeInUp}>
        <div className={styles.contentSection}>
          <p className={styles.leadText}>
            Join us <strong>January 2026</strong> at Dalhousie University, 
            where we will welcome over <strong>250 delegates from across Canada</strong>. This conference will spotlight the latest research, 
            hear inspiring success stories, and highlight emerging leaders within the 2SLGBTQ+ STEM community.
          </p>
          <p className={styles.leadText}>
            The diversification of STEM fields is essential if we are to mobilize talent in Canada, drive innovation and promote 
            discovery across all scientific fields. The conference brings together leading experts, innovators, and changemakers to 
            explore actionable strategies for dismantling barriers to 2SLGBTQ+ success in STEM. In addition to great science, we will 
            also hear about increasing visibility, improving recruitment and retention of queer and trans scientists, and strategies to 
            foster truly inclusive cultures in academia, industry, and beyond.
          </p>
        </div>
      </motion.section>

      {/* Why Attend Cards */}
      <motion.section className={styles.cardsSection} {...fadeInUp}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>Why Attend</h2>
          <div className={styles.cardsGrid}>
            {[
              { title: "Network & Connect", desc: "Build meaningful relationships with 2SLGBTQ+ professionals and allies across diverse STEM disciplines" },
              { title: "Learn & Grow", desc: "Engage with cutting-edge research, keynote presentations, and professional development workshops" },
              { title: "Share Your Story", desc: "Present your research through oral presentations, posters, and interactive sessions" },
              { title: "Career Opportunities", desc: "Connect with leading organizations, sponsors, and potential employers seeking diverse talent" },
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

      {/* Conference Highlights */}
      <motion.section className={styles.highlightsSection} {...fadeInUp}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>Conference Highlights</h2>
          <div className={styles.highlightsGrid}>
            <div className={styles.highlightCard}>
              <h3>Keynote Speakers</h3>
              <p>Hear from distinguished leaders and pioneers in 2SLGBTQ+ STEM advocacy and research</p>
            </div>
            <div className={styles.highlightCard}>
              <h3>Research Presentations</h3>
              <p>Showcase your work through oral presentations and poster sessions across all STEM fields</p>
            </div>
            <div className={styles.highlightCard}>
              <h3>Networking Events</h3>
              <p>Connect with peers, mentors, and potential collaborators in dedicated networking sessions</p>
            </div>
            <div className={styles.highlightCard}>
              <h3>Career Fair</h3>
              <p>Meet with organizations actively seeking to diversify their teams and create inclusive workplaces</p>
            </div>
            <div className={styles.highlightCard}>
              <h3>Professional Development</h3>
              <p>Participate in workshops on leadership, career advancement, and navigating STEM as 2SLGBTQ+</p>
            </div>
            <div className={styles.highlightCard}>
              <h3>Social Events</h3>
              <p>Enjoy inclusive social gatherings celebrating our community's diversity and achievements</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section className={styles.ctaSection} {...fadeInUp}>
        <div className={styles.ctaContent}>
          <h2>Ready to Join Us?</h2>
          <p>Register now to secure your spot at Canada's largest 2SLGBTQ+ STEM gathering</p>
          <div className={styles.ctaButtons}>
            <a href="/register" className={styles.primaryButton}>
              Register Now
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