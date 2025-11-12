"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./about.module.css";

const fadeInUp = {
    initial: { y: 40, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true },
    transition: { duration: 0.6 },
};

export default function AboutPage() {
    return (
        <div className={styles.aboutPage}>
            {/* Page Header - Simple, Clean */}
            <motion.section className={styles.pageHeader} {...fadeInUp}>
                <div className={styles.headerContent}>
                    <h1 className={styles.pageTitle}>
                      About Us
                    </h1>
                    <p className={styles.pageSubtitle}>
                        Building an inclusive community where diverse voices drive innovation and shape the future of science, technology, engineering, and mathematics.
                    </p>
                </div>
            </motion.section>

            {/* Mission & Vision Section */}
            <motion.section className={styles.missionVisionSection} {...fadeInUp}>
                <div className={styles.sectionContainer}>
                    <div className={styles.mvGrid}>
                        <motion.div 
                            className={styles.mvCard}
                            initial={{ x: -50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2>Our Mission</h2>
                            <p>
                                To create an inclusive space where 2SLGBTQ+ professionals and students in STEM 
                                can connect, learn, and advance their careers. We foster diversity, equity, and 
                                inclusion through education, networking, and professional development opportunities.
                            </p>
                            <ul className={styles.mvList}>
                                <li>Promote 2SLGBTQ+ visibility in STEM fields</li>
                                <li>Provide networking and mentorship opportunities</li>
                                <li>Support career development and advancement</li>
                                <li>Create safe, inclusive spaces for all identities</li>
                            </ul>
                        </motion.div>

                        <motion.div 
                            className={styles.mvCard}
                            initial={{ x: 50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2>Our Vision</h2>
                            <p>
                                A world where 2SLGBTQ+ individuals feel safer, valued, and celebrated in STEM 
                                fields, regardless of their identity or background. We envision an environment 
                                where everyone can thrive, innovate, and contribute their unique perspectives.
                            </p>
                            <ul className={styles.mvList}>
                                <li>Eliminate barriers to STEM participation</li>
                                <li>Champion diverse voices and perspectives</li>
                                <li>Build lasting, supportive communities</li>
                                <li>Drive innovation through inclusivity</li>
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* CTA Section */}
            <motion.section className={styles.ctaSection} {...fadeInUp}>
                <div className={styles.ctaContent}>
                    <h2>Join Our Community</h2>
                    <p>Be part of Canada's growing 2SLGBTQ+ STEM network</p>
                    <div className={styles.ctaButtons}>
                        <Link href="/register" className={styles.primaryButton}>
                            Register for Conference
                        </Link>
                        <Link href="/contact" className={styles.secondaryButton}>
                            Get in Touch
                        </Link>
                    </div>
                </div>
            </motion.section>
        </div>
    );
}
