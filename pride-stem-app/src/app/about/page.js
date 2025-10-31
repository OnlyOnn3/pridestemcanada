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
              
            </p>
            
            <div className={styles.features}>
              <div className={styles.featureItem}>
                <h3>Our Vision</h3>
                <p></p>
              </div>
              
              <div className={styles.featureItem}>
                <h3>Our Mission</h3>
                <p>       </p>
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