"use client";
import { motion } from 'framer-motion';
import { COLORS } from '../constants';
import styles from '../about.module.css';

export default function HeroSection({ headerOpacity, headerY, scale }) {
    return (
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
                        background: COLORS.gradientText,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    Pride STEM
                </h1>
                <h2 className="display-4 text-muted">Innovating Together</h2>
            </div>
        </motion.div>
    );
}