"use client";
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { ANIMATIONS } from '../constants';

const stats = [
    { number: 500, label: "Members", symbol: "+" },
    { number: 50, label: "Events", symbol: "+" },
    { number: 25, label: "Partners", symbol: "+" },
    { number: 95, label: "Satisfaction", symbol: "%" }
];

function CountingNumber({ value, symbol, duration = 2000 }) {
    const [count, setCount] = useState(0);
    const nodeRef = useRef();
    const isInView = useInView(nodeRef, { once: true });

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = parseInt(value);
            const incrementTime = duration / end;
            const counter = setInterval(() => {
                start += 1;
                setCount(start);
                if (start === end) clearInterval(counter);
            }, incrementTime);

            return () => clearInterval(counter);
        }
    }, [value, duration, isInView]);

    return (
        <span ref={nodeRef} className="display-4 fw-bold">
            {count}{symbol}
        </span>
    );
}

export default function StatsSection() {
    return (
        <div className="py-5 text-center">
            <motion.h2 
                className="display-4 mb-5"
                style={{
                    background: "linear-gradient(90deg, #ff0080, #7928ca)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                }}
                {...ANIMATIONS.slideUp}
            >
                Our Impact
            </motion.h2>
            <div className="row g-4">
                {stats.map((stat, index) => (
                    <div key={stat.label} className="col-6 col-md-3">
                        <motion.div
                            className="p-4"
                            initial={{ scale: 0.5, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ 
                                scale: 1.05,
                                transition: { duration: 0.2 }
                            }}
                        >
                            <CountingNumber 
                                value={stat.number} 
                                symbol={stat.symbol}
                            />
                            <motion.p 
                                className="text-muted mb-0"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.5 + index * 0.1 }}
                            >
                                {stat.label}
                            </motion.p>
                        </motion.div>
                    </div>
                ))}
            </div>
        </div>
    );
}