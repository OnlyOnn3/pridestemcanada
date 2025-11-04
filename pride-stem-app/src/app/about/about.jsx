"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./about.module.css";

export default function AboutPage() {
    const [isHovered, setIsHovered] = useState(false);
    const { scrollY } = useScroll();

    const headerOpacity = useTransform(scrollY, [0, 200], [1, 0]);
    const headerY = useTransform(scrollY, [0, 200], [0, -50]);
    const scale = useTransform(scrollY, [0, 200], [1, 0.95]);

    return (
        <div className={styles['about-container']}>
            <motion.div 
                className={`${styles['hero-section']} vh-100 d-flex align-items-center justify-content-center`}
                style={{ 
                    opacity: headerOpacity,
                    y: headerY,
                    scale,
                    position: 'relative'
                }}
            >
                <div className="text-center">
                    <h1
                        className="display-1 fw-bold mb-3"
                        style={{
                            background: "linear-gradient(90deg, #ff0080, #7928ca)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        Pride STEM
                    </h1>
                    <h2 className="display-4 text-muted">Innovating Together</h2>
                </div>
            </motion.div>

                <motion.div 
                    className={`${styles['vision-section']} vh-100 d-flex align-items-center`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <div className="container">
                        <div className="row align-items-center">
                            <motion.div 
                                className="col-md-6"
                                initial={{ x: -100, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.8 }}
                            >
                                <h2 className="display-3 fw-bold mb-4" style={{ color: "#ff0080" }}>
                                    Our Vision
                                </h2>
                                <p className="lead">
                                    Creating an inclusive and supportive environment in STEM fields where
                                    everyone can thrive, innovate, and contribute their unique perspectives.
                                </p>
                            </motion.div>
                            <motion.div 
                                className="col-md-6"
                                initial={{ scale: 0.8, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.8 }}
                            >
                                <div className="p-4 rounded-4" style={{
                                    background: "linear-gradient(135deg, rgba(255,0,128,0.1), rgba(121,40,202,0.1))"
                                }}>
                                    <img 
                                        src="/img/vision-placeholder.jpg" 
                                        alt="Vision representation" 
                                        className="img-fluid rounded-3 shadow-lg"
                                        style={{ width: "100%", height: "auto" }}
                                    />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                <motion.div 
                    className={`${styles['mission-section']} vh-100 d-flex align-items-center`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <div className="container">
                        <div className="row align-items-center flex-row-reverse">
                            <motion.div 
                                className="col-md-6"
                                initial={{ x: 100, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.8 }}
                            >
                                <h2 className="display-3 fw-bold mb-4" style={{ color: "#7928ca" }}>
                                    Our Mission
                                </h2>
                                <p className="lead">
                                    To foster diversity, equity, and inclusion in STEM through education,
                                    networking, and professional development opportunities.
                                </p>
                            </motion.div>
                            <motion.div 
                                className="col-md-6"
                                initial={{ scale: 0.8, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.8 }}
                            >
                                <div className="p-4 rounded-4" style={{
                                    background: "linear-gradient(135deg, rgba(121,40,202,0.1), rgba(255,0,128,0.1))"
                                }}>
                                    <img 
                                        src="/img/mission-placeholder.jpg" 
                                        alt="Mission representation" 
                                        className="img-fluid rounded-3 shadow-lg"
                                        style={{ width: "100%", height: "auto" }}
                                    />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                <motion.div 
                    className={`${styles['cta-section']} vh-100 d-flex align-items-center justify-content-center`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <div className="text-center">
                        <motion.h2 
                            className="display-2 fw-bold mb-5"
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            style={{
                                background: "linear-gradient(90deg, #ff0080, #7928ca)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            Join Our Community
                        </motion.h2>
                        <motion.button
                            className="btn btn-lg fw-bold text-white px-5 py-3 border-0"
                            style={{
                                background: isHovered
                                    ? "linear-gradient(90deg, #ff4da6, #9c4bff)"
                                    : "linear-gradient(90deg, #ff0080, #7928ca)",
                                transition: "all 0.3s ease",
                            }}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Register Now
                        </motion.button>
                    </div>
                </motion.div>
            </div>
    );
}
