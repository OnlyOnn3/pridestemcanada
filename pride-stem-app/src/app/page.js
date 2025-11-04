"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./home/home.module.css";
import { SECTIONS } from "./home/constants";

// Home Components
import HeroSection from "./home/components/HeroSection";
import TextSection from "./home/components/TextSection";
import FeatureSection from "./home/components/FeatureSection";
import StatsSection from "./home/components/StatsSection";
import ParallaxCTA from "./home/components/ParallaxCTA";
import ScrollIndicator from "./home/components/ScrollIndicator";

// About Components
import AboutHero from "./about/components/HeroSection";
import AboutVision from "./about/components/VisionSection";
import AboutMission from "./about/components/MissionSection";
import AboutCTA from "./about/components/CTASection";

export default function HomePage() {
    const { scrollY } = useScroll();
    const opacity = useTransform(scrollY, [0, 800], [1, 0.95]);
    const scale = useTransform(scrollY, [0, 800], [1, 0.98]);

    return (
        <div>
            <ScrollIndicator />
            <motion.div 
                className={styles['home-container']}
                style={{ opacity, scale }}
            >
                <div className={styles['section']}>
                    <div className={styles['section-content']}>
                        <HeroSection section={SECTIONS[0]} />
                    </div>
                </div>

                <div className={styles['section']}>
                    <div className={styles['section-content']}>
                        <FeatureSection />
                    </div>
                </div>

                <div className={styles['section']}>
                    <div className={styles['section-content']}>
                        <TextSection section={SECTIONS[1]} />
                    </div>
                </div>

                <div className={styles['section']}>
                    <div className={styles['section-content']}>
                        <StatsSection />
                    </div>
                </div>

                <div className={styles['section']}>
                    <div className={styles['section-content']}>
                        <TextSection section={SECTIONS[2]} />
                    </div>
                </div>

                {/* About Page Section */}
                <motion.div
                    className={styles['section']}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <AboutHero 
                        headerOpacity={useTransform(scrollY, [800, 1000], [0, 1])}
                        headerY={useTransform(scrollY, [800, 1000], [50, 0])}
                        scale={useTransform(scrollY, [800, 1000], [0.95, 1])}
                    />
                </motion.div>

                <motion.div
                    className={styles['section']}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <AboutVision />
                </motion.div>

                <motion.div
                    className={styles['section']}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <AboutMission />
                </motion.div>

                <motion.div
                    className={styles['section']}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <AboutCTA />
                </motion.div>

                <ParallaxCTA />
            </motion.div>
        </div>
    );
}
