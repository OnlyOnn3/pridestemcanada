"use client";
import { motion } from 'framer-motion';
import { ANIMATIONS } from '../constants';

export default function HeroSection({ section }) {
    return (
        <div className="d-flex flex-row justify-content-around mx-auto align-items-center min-vh-75">
            <motion.div 
                className="container px-3"
                {...ANIMATIONS.slideInLeft}
            >
                <motion.div 
                    className="py-3"
                    {...ANIMATIONS.fadeIn}
                >
                    <motion.p 
                        className="h1 pride-gradient w-100 fw-bold rounded-3 pb-5"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        {section.title}
                    </motion.p>
                    <motion.p 
                        className="p-4 text-dark shadow-sm collapse-content lead"
                        {...ANIMATIONS.slideUp}
                    >
                        {section.body}
                    </motion.p>
                </motion.div>
            </motion.div>

            <motion.div
                {...ANIMATIONS.slideInRight}
                className="d-none d-md-block"
            >
                <picture className="position-relative">
                    <source media="(min-width:600px)" srcSet="https://placehold.co/600x400" />
                    <source media="(min-width:1080px)" srcSet="https://placehold.co/1080x720" />
                    <source media="(min-width:1920px)" srcSet="https://placehold.co/1920x1080" />
                    <motion.img 
                        src="https://placehold.co/600x400" 
                        className="img-fluid rounded-4 shadow-lg"
                        whileHover={{ 
                            scale: 1.02,
                            transition: { duration: 0.3 }
                        }}
                    />
                </picture>
            </motion.div>
        </div>
    );
}