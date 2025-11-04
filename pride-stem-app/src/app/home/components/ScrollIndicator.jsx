"use client";
import { motion } from 'framer-motion';

export default function ScrollIndicator() {
    return (
        <motion.div
            className="position-fixed bottom-0 start-50 translate-middle-x pb-4 z-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
        >
            <motion.div
                className="d-flex flex-column align-items-center text-muted"
                animate={{ y: [0, 10, 0] }}
                transition={{ 
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut"
                }}
            >
                <div className="mb-2">Scroll to explore</div>
                <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                >
                    <path d="M12 5v14M5 12l7 7 7-7"/>
                </svg>
            </motion.div>
        </motion.div>
    );
}