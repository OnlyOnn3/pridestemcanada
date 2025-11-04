"use client";
import { motion } from 'framer-motion';
import { COLORS, ANIMATIONS } from '../constants';
import styles from '../about.module.css';

export default function CTASection({ isHovered, setIsHovered }) {
    return (
        <motion.div 
            className={`${styles['cta-section']} vh-100 d-flex align-items-center justify-content-center`}
            {...ANIMATIONS.fadeIn}
        >
            <div className="text-center">
                <motion.h2 
                    className="display-2 fw-bold mb-5"
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.35 }}
                    style={{
                        background: COLORS.gradientText,
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
                            ? COLORS.buttonHover
                            : COLORS.buttonNormal,
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
    );
}