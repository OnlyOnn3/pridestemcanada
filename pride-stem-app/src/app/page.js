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
import Link from "next/link";
import styles from "./page.module.css";
import ImageSlider from "./ImageSlider";

export default function HomePage() {
  return (
    <div className={styles.homepage}>
      {/* Hero Section*/}
      <section className={styles.heroSection}>
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
      </section>

      {/* Image Slider */}
      <ImageSlider />

      {/* Conference Highlights Section */}
      <section className={styles.highlightsSection}>
        <div className={styles.highlightsContainer}>
          <h2 className={styles.highlightsTitle}>2026 Conference Highlights</h2>
          <p className={styles.highlightsSubtitle}>
            Join us in January 2026 at Dalhousie University, Halifax for Canada's premier 2SLGBTQ+ STEM gathering
          </p>
          
          <div className={styles.highlightsGrid}>
            <div className={styles.highlightCard}>
              <div className={styles.highlightIcon}>250+</div>
              <h3>Delegates</h3>
              <p>Connect with professionals, researchers, and students from across Canada</p>
            </div>

            <div className={styles.highlightCard}>
              <div className={styles.highlightIcon}>Keynote</div>
              <h3>Speakers</h3>
              <p>Hear from distinguished leaders and pioneers in 2SLGBTQ+ STEM advocacy</p>
            </div>

            <div className={styles.highlightCard}>
              <div className={styles.highlightIcon}>Research</div>
              <h3>Presentations</h3>
              <p>Showcase your work through oral presentations and poster sessions</p>
            </div>

            <div className={styles.highlightCard}>
              <div className={styles.highlightIcon}>Network</div>
              <h3>Events</h3>
              <p>Build meaningful connections with peers, mentors, and potential collaborators</p>
            </div>
          </div>

          <div className={styles.highlightsCTA}>
            <Link href="/conference/about" className={styles.secondaryButton}>
              Learn More About the Conference
            </Link>
            <Link href="/register" className={styles.primaryButton}>
              Register Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}