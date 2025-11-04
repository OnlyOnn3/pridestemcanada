"use client";
import { motion } from 'framer-motion';
import { COLORS, ANIMATIONS } from '../constants';
import styles from '../about.module.css';

export default function MissionSection() {
    return (
        <motion.div 
            className={`${styles['mission-section']} vh-100 d-flex align-items-center`}
            {...ANIMATIONS.fadeIn}
        >
            <div className="container">
                <div className="row align-items-center flex-row-reverse">
                    <motion.div 
                        className="col-md-6"
                        {...ANIMATIONS.slideInRight}
                    >
                        <h2 className="display-3 fw-bold mb-4" style={{ color: COLORS.secondary }}>
                            Our Mission
                        </h2>
                        <p className="lead">
                            To foster diversity, equity, and inclusion in STEM through education,
                            networking, and professional development opportunities.
                        </p>
                    </motion.div>
                    <motion.div 
                        className="col-md-6"
                        {...ANIMATIONS.scaleIn}
                    >
                        <div className="p-4 rounded-4" style={{
                            background: COLORS.gradientBg.secondary
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
    );
}