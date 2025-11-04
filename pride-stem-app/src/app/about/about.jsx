"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useScroll, useTransform } from "framer-motion";
import styles from "./about.module.css";

// Components
import HeroSection from './components/HeroSection';
import VisionSection from './components/VisionSection';
import MissionSection from './components/MissionSection';
import CTASection from './components/CTASection';

export default function AboutPage() {
    const [isHovered, setIsHovered] = useState(false);
    const { scrollY } = useScroll();

    const headerOpacity = useTransform(scrollY, [0, 200], [1, 0]);
    const headerY = useTransform(scrollY, [0, 200], [0, -50]);
    const scale = useTransform(scrollY, [0, 200], [1, 0.95]);

    return (
        <div className={styles['about-container']}>
            <HeroSection 
                headerOpacity={headerOpacity}
                headerY={headerY}
                scale={scale}
            />
            <VisionSection />
            <MissionSection />
            <CTASection 
                isHovered={isHovered}
                setIsHovered={setIsHovered}
            />
        </div>
    );
}
