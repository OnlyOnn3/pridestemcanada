"use client";
import { motion } from 'framer-motion';
import { ANIMATIONS } from '../constants';

export default function TextSection({ section, isReversed = false }) {
    return (
        <motion.section 
            className="py-5"
            {...ANIMATIONS.fadeIn}
        >
            <motion.div 
                className="mb-4"
                {...ANIMATIONS.slideUp}
            >
                <p className="h2 pride-gradient w-100 fw-semibold rounded-3 pb-5 text-center">
                    {section.title}
                </p>
            </motion.div>
            <motion.div
                className="p-4 text-dark shadow-sm collapse-content"
                initial={{ scale: 0.95, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ 
                    duration: 0.6,
                    delay: 0.2
                }}
            >
                <p className="mb-0">{section.body}</p>
            </motion.div>
        </motion.section>
    );
}