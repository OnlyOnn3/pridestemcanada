import styles from "../page.module.css";
import Link from "next/link";

export default function ConferencePage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.aboutHeader}>
          <h1 className={styles.aboutTitle}>Pride</h1>
          <div className={styles.stepIndicator}>STEP</div>
        </div>
        
        <div className={styles.aboutContent}>
          <div className={styles.savedIndicator}>
            <span className={styles.savedText}>Saved</span>
          </div>
          
          <div className={styles.aboutMain}>
            <h2 className={styles.aboutSubtitle}>About Our Conference</h2>
            <p className={styles.aboutDescription}>
              Welcome to Pride Conference, where we celebrate diversity, inclusion, 
              and the vibrant LGBTQ+ community. Our mission is to create a safe, 
              empowering space for meaningful conversations, connections, and growth.
            </p>
            
            <div className={styles.features}>
              <div className={styles.featureItem}>
                <h3>Our Vision</h3>
                <p>Building a world where everyone can live authentically and proudly.</p>
              </div>
              
              <div className={styles.featureItem}>
                <h3>Our Mission</h3>
                <p>To educate, inspire, and connect through powerful stories and shared experiences.</p>
              </div>
            </div>
          </div>
          
          <div className={styles.actionSection}>
            <button className={styles.primaryButton}>
              Join Our Community
            </button>
            
            <div className={styles.branding}>
              <span className={styles.brandInitials}>M G</span>
              <span className={styles.brandName}>NOREMEI</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}