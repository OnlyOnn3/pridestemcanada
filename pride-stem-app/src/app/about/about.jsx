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
            <motion.section className={styles.pageHeader} {...fadeInUp}>
                <div className={styles.headerContent}>
                    <h1 className={styles.pageTitle}>
                      About Us
                    </h1>
                    <p className={styles.pageSubtitle}>
                        Join us from January *insert date* to *insert date* , 2026, at Dalhousie, where we will expect to welcome over 250 delegates from across Canada. This conference will spotlight the latest research, hear inspiring success stories, and highlight emerging leaders within the 2SLGBTQ+ STEM community. 

                        The diversification of STEM fields is essential if we are to mobilize talent in Canada, drive innovation and promote discovery across all scientific fields. The conference brings together leading experts, innovators, and changemakers to explore actionable strategies for dismantling barriers to 2SLGBTQ+ success in STEM. In addition to great science, we will also hear about increasing visibility, improving recruitment and retention of queer and trans scientists, and strategies to foster truly inclusive cultures in academia, industry, and beyond.
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
                                Now in its sixth year, the 2SLGBTQ+ in STEM Conference is an annual nationwide event dedicated to celebrating and advancing the contributions of the 2SLGBTQ+ community in science, technology, engineering, and mathematics (STEM). Dedicated and passionate students from across Canada and across scientific disciplines will have the opportunity to connect with organizations seeking talent, thus helping to bridge existing talent gaps in various STEM and STEM-related fields.
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
                            Attend the Conference
                        </Link>
                        <Link href="/contact" className={styles.primaryButton}>
                            Contact Us
                        </Link>
                    </div>
                </div>
            </motion.section>
        </div>
    );
}
