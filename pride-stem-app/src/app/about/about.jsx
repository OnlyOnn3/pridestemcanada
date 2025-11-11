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
                    <motion.div 
                        className={styles.badge}
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        About Pride STEM Canada
                    </motion.div>
                    <h1 className={styles.pageTitle}>
                        Celebrating <span className={styles.gradientText}>2SLGBTQ+</span> Excellence in STEM
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

            {/* Our Story Section */}
            <motion.section className={styles.storySection} {...fadeInUp}>
                <div className={styles.sectionContainer}>
                    <h2 className={styles.sectionTitle}>Our Story</h2>
                    <div className={styles.storyContent}>
                        <motion.div 
                            className={styles.storyCard}
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className={styles.storyYear}>2019</div>
                            <h3>The Beginning</h3>
                            <p>
                                Pride STEM Canada was founded with a vision to create meaningful connections 
                                and opportunities for 2SLGBTQ+ individuals in science, technology, engineering, 
                                and mathematics fields across the country.
                            </p>
                        </motion.div>

                        <motion.div 
                            className={styles.storyCard}
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <div className={styles.storyYear}>2020-2024</div>
                            <h3>Growing Together</h3>
                            <p>
                                Through five successful annual conferences, we've brought together hundreds of 
                                professionals, students, and allies. Our community has grown to become a vital 
                                network for support, mentorship, and collaboration.
                            </p>
                        </motion.div>

                        <motion.div 
                            className={styles.storyCard}
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <div className={styles.storyYear}>2025</div>
                            <h3>Looking Forward</h3>
                            <p>
                                As we celebrate our 6th annual conference, we continue to expand our reach, 
                                deepen our impact, and build a more inclusive future for 2SLGBTQ+ individuals 
                                in STEM across Canada and beyond.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* What We Do Section */}
            <motion.section className={styles.whatWeDoSection} {...fadeInUp}>
                <div className={styles.sectionContainer}>
                    <h2 className={styles.sectionTitle}>What We Do</h2>
                    <div className={styles.activitiesGrid}>
                        {[
                            {
                                title: "Annual Conference",
                                description: "Our flagship event brings together 500+ attendees for inspiring talks, workshops, and networking opportunities."
                            },
                            {
                                title: "Networking Events",
                                description: "Regular meetups and social events to connect 2SLGBTQ+ professionals and students across STEM fields."
                            },
                            {
                                title: "Mentorship Programs",
                                description: "Connecting experienced professionals with students and early-career individuals for guidance and support."
                            }
                        ].map((activity, idx) => (
                            <motion.div
                                key={idx}
                                className={styles.activityCard}
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                            >
                                <h3>{activity.title}</h3>
                                <p>{activity.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Impact Stats Section */}
            <motion.section className={styles.impactSection} {...fadeInUp}>
                <div className={styles.sectionContainer}>
                    <h2 className={styles.sectionTitle}>Our Impact</h2>
                    <div className={styles.statsGrid}>
                        {[
                            { number: "6", label: "Years of Excellence", suffix: "+" },
                            { number: "500", label: "Annual Attendees", suffix: "+" },
                            { number: "50", label: "Expert Speakers", suffix: "+" },
                            { number: "10", label: "Cities Represented", suffix: "+" },
                        ].map((stat, idx) => (
                            <motion.div
                                key={idx}
                                className={styles.statCard}
                                initial={{ scale: 0.8, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                            >
                                <div className={styles.statNumber}>{stat.number}{stat.suffix}</div>
                                <div className={styles.statLabel}>{stat.label}</div>
                            </motion.div>
                        ))}
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
