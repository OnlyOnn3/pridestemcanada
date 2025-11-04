"use client";
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function ParallaxCTA() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

    return (
        <motion.div 
            ref={ref}
            className="py-5 position-relative overflow-hidden"
            style={{
                background: "linear-gradient(135deg, rgba(255,0,128,0.1), rgba(121,40,202,0.1))"
            }}
        >
            <motion.div
                className="position-absolute w-100 h-100 top-0 start-0"
                style={{
                    backgroundImage: "url('https://placehold.co/1920x1080')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    opacity: 0.1,
                    y
                }}
            />
            <div className="container position-relative">
                <div className="row justify-content-center">
                    <div className="col-lg-8 text-center py-5">
                        <motion.h2
                            className="display-3 fw-bold mb-4"
                            style={{
                                background: "linear-gradient(90deg, #ff0080, #7928ca)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            Ready to Join the Community?
                        </motion.h2>
                        <motion.p
                            className="lead mb-4"
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            Be part of a growing network of 2SLGBTQ+ professionals in STEM
                        </motion.p>
                        <motion.button
                            className="btn btn-lg pride-btn px-5 py-3"
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.4, delay: 0.4 }}
                        >
                            Register Now
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}