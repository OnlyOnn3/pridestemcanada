"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./governance.module.css";

const fadeInUp = {
    initial: { y: 40, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true },
    transition: { duration: 0.6 },
};

export default function GovernancePage() {
    return (
        <div className={styles.governancePage}>
            {/* Hero Section */}
            <motion.section className={styles.heroSection} {...fadeInUp}>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>
                        Governance & Organization
                    </h1>
                    <p className={styles.heroSubtitle}>
                        Pride STEM Canada operates as a transparent, accountable non-profit organization 
                        dedicated to creating inclusive spaces for 2SLGBTQ+ individuals in STEM fields.
                    </p>
                </div>
            </motion.section>

            {/* Core Values Grid */}
            <motion.section className={styles.valuesSection} {...fadeInUp}>
                <div className={styles.sectionContainer}>
                    <h2 className={styles.sectionTitle}>Our Core Values</h2>
                    <div className={styles.valuesGrid}>
                        {[
                            { title: "Integrity", desc: "Operating with honesty and ethical standards in all our activities" },
                            { title: "Transparency", desc: "Open communication and accountability to our community" },
                            { title: "Inclusivity", desc: "Welcoming all 2SLGBTQ+ voices and experiences in STEM" },
                            { title: "Excellence", desc: "Commitment to quality and best practices in everything we do" },
                        ].map((value, idx) => (
                            <motion.div 
                                key={idx}
                                className={styles.valueCard}
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                            >
                                <h3>{value.title}</h3>
                                <p>{value.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Main Content Grid */}
            <section className={styles.contentSection}>
                <div className={styles.sectionContainer}>
                    <div className={styles.contentGrid}>
                        {/* Non-Profit Organization */}
                        <motion.div className={styles.contentCard} {...fadeInUp}>
                            <div className={styles.cardHeader}>
                                <h2>Non-Profit Organization</h2>
                            </div>
                            <div className={styles.cardContent}>
                                <p>
                                    Pride STEM Canada is a registered Canadian non-profit organization dedicated to 
                                    advancing 2SLGBTQ+ representation and inclusion in Science, Technology, Engineering, 
                                    and Mathematics fields across Canada.
                                </p>
                                <p>
                                    As a non-profit, we are committed to transparency, accountability, and serving our 
                                    community's best interests. Our operations are guided by our bylaws and governed by 
                                    a dedicated board of directors.
                                </p>
                                <div className={styles.highlightBox}>
                                    <h4>Our Non-Profit Status</h4>
                                    <ul>
                                        <li>Registered Canadian Non-Profit Corporation</li>
                                        <li>Governed by federal and provincial non-profit legislation</li>
                                        <li>All donations support our mission and programs</li>
                                        <li>Annual financial reporting and transparency</li>
                                        <li>Member-driven organization with democratic governance</li>
                                    </ul>
                                </div>
                            </div>
                        </motion.div>

                        {/* Bylaws */}
                        <motion.div className={styles.contentCard} {...fadeInUp}>
                            <div className={styles.cardHeader}>
                                <h2>Bylaws & Governance</h2>
                            </div>
                            <div className={styles.cardContent}>
                                <p>
                                    Our bylaws establish the rules and procedures that govern Pride STEM Canada's 
                                    operations, ensuring accountability, transparency, and effective management.
                                </p>
                                
                                <div className={styles.twoColumnList}>
                                    <div className={styles.listColumn}>
                                        <h4>Key Provisions</h4>
                                        <ul>
                                            <li><strong>Membership</strong> - Eligibility, rights, and responsibilities</li>
                                            <li><strong>Board of Directors</strong> - Composition and election procedures</li>
                                            <li><strong>Meetings</strong> - AGM and special meeting protocols</li>
                                        </ul>
                                    </div>
                                    <div className={styles.listColumn}>
                                        <h4>Governance Principles</h4>
                                        <ul>
                                            <li>Elected Board of Directors</li>
                                            <li>Regular board and annual meetings</li>
                                            <li>Transparent decision-making</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className={styles.noteBox}>
                                    <strong>Request Bylaws:</strong> Full bylaws are available to members. Contact us to request a copy.
                                </div>
                            </div>
                        </motion.div>

                        {/* CIANP */}
                        <motion.div className={styles.contentCard} {...fadeInUp}>
                            <div className={styles.cardHeader}>
                                <h2>CIANP Membership</h2>
                            </div>
                            <div className={styles.cardContent}>
                                <p>
                                    Pride STEM Canada is affiliated with the Canadian Institute for the Advancement of 
                                    Non-Profits (CIANP), demonstrating our commitment to non-profit excellence and 
                                    best practices.
                                </p>

                                <h4>CIANP Support Includes</h4>
                                <div className={styles.benefitsGrid}>
                                    <div className={styles.benefit}>
                                        <span>Professional development & training</span>
                                    </div>
                                    <div className={styles.benefit}>
                                        <span>Governance best practices</span>
                                    </div>
                                    <div className={styles.benefit}>
                                        <span>Networking opportunities</span>
                                    </div>
                                    <div className={styles.benefit}>
                                        <span>Sector advocacy</span>
                                    </div>
                                    <div className={styles.benefit}>
                                        <span>Standards & certification</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Transparency */}
                        <motion.div className={styles.contentCard} {...fadeInUp}>
                            <div className={styles.cardHeader}>
                                <h2>Transparency & Accountability</h2>
                            </div>
                            <div className={styles.cardContent}>
                                <p>
                                    We operate with the highest standards of transparency and accountability to our 
                                    members, donors, and the broader 2SLGBTQ+ STEM community.
                                </p>

                                <div className={styles.twoColumnList}>
                                    <div className={styles.listColumn}>
                                        <h4>Financial Transparency</h4>
                                        <ul>
                                            <li>Annual financial statements</li>
                                            <li>Regular financial reporting</li>
                                            <li>Independent financial reviews</li>
                                            <li>Clear donation usage reporting</li>
                                        </ul>
                                    </div>
                                    <div className={styles.listColumn}>
                                        <h4>Operational Accountability</h4>
                                        <ul>
                                            <li>Documented board meetings</li>
                                            <li>Annual general meetings</li>
                                            <li>Clear policies & procedures</li>
                                            <li>Feedback mechanisms</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className={styles.ctaBox}>
                                    <p>Questions about our governance or bylaws?</p>
                                    <Link href="/contact" className={styles.ctaButton}>
                                        Contact Us
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <motion.section className={styles.bottomCTA} {...fadeInUp}>
                <div className={styles.ctaContent}>
                    <h2>Get Involved With Pride STEM Canada</h2>
                    <p>Join us in creating a more inclusive STEM community</p>
                    <div className={styles.ctaButtons}>
                        <Link href="/register" className={styles.primaryButton}>
                            Register for Conference
                        </Link>
                        <Link href="/vendors" className={styles.secondaryButton}>
                            Become a Sponsor
                        </Link>
                    </div>
                </div>
            </motion.section>
        </div>
    );
}
