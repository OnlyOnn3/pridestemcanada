"use client";
import { motion } from 'framer-motion';
import { COLORS, ANIMATIONS } from '../constants';
import styles from '../about.module.css';

export default function VisionSection() {
    return (
        <motion.div 
            className={`${styles['vision-section']} vh-100 d-flex align-items-center`}
            {...ANIMATIONS.fadeIn}
        >
            <div className="container">
                <div className="row align-items-center">
                    <motion.div 
                        className="col-md-6"
                        {...ANIMATIONS.slideInLeft}
                    >
                        <h2 className="display-3 fw-bold mb-4" style={{ color: COLORS.primary }}>
                            Our Vision
                        </h2>
                        <p className="lead">
                            Creating an inclusive and supportive environment in STEM fields where
                            everyone can thrive, innovate, and contribute their unique perspectives.
                        </p>
                    </motion.div>
                    <motion.div 
                        className="col-md-6"
                        {...ANIMATIONS.scaleIn}
                    >
                        <div className="p-4 rounded-4" style={{
                            background: COLORS.gradientBg.primary
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
    );
}