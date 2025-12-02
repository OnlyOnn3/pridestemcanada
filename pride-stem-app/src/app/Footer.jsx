"use client";

import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                <div className={styles.footerGrid}>
                    {/* About Section */}
                    <div className={styles.footerSection}>
                        <h3 className={styles.footerTitle}>Pride STEM Canada</h3>
                        <p className={styles.footerText}>
                            Celebrating and advancing 2SLGBTQ+ voices in Science, Technology, 
                            Engineering, and Mathematics across Canada.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className={styles.footerSection}>
                        <h4 className={styles.footerHeading}>Quick Links</h4>
                        <ul className={styles.footerLinks}>
                            <li><Link href="/about">About Us</Link></li>
                            <li><Link href="/conference/about">Conference</Link></li>
                            <li><Link href="/governance">Governance</Link></li>
                            <li><Link href="/contact">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Conference */}
                    <div className={styles.footerSection}>
                        <h4 className={styles.footerHeading}>Conference</h4>
                        <ul className={styles.footerLinks}>
                            <li><Link href="/register">Register</Link></li>
                            <li><Link href="/conference/schedule">Schedule</Link></li>
                            <li><Link href="/conference/present">Present</Link></li>
                            <li><Link href="/conference/partner">Partner</Link></li>
                        </ul>
                    </div>

                    {/* Connect */}
                    <div className={styles.footerSection}>
                        <h4 className={styles.footerHeading}>Connect</h4>
                        <p className={styles.footerText}>
                            Join Canada's growing 2SLGBTQ+ STEM community
                        </p>
                        <Link href="/contact" className={styles.footerButton}>
                            Get In Touch
                        </Link>
                    </div>
                </div>

                {/* Copyright Bar */}
                <div className={styles.footerBottom}>
                    <p className={styles.copyright}>
                        © {new Date().getFullYear()} Pride STEM Canada. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
