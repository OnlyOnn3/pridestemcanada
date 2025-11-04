"use client";
import { motion } from 'framer-motion';
import { ANIMATIONS } from '../constants';

const features = [
    {
        title: "Connect",
        description: "Network with other 2SLGBTQ+ professionals and allies in STEM fields",
        icon: "🤝",
    },
    {
        title: "Learn",
        description: "Access workshops, talks, and resources from industry leaders",
        icon: "📚",
    },
    {
        title: "Grow",
        description: "Develop your skills and advance your career in STEM",
        icon: "🌱",
    },
];

export default function FeatureSection() {
    return (
        <div className="py-5">
            <motion.h2 
                className="text-center display-4 mb-5"
                style={{
                    background: "linear-gradient(90deg, #ff0080, #7928ca)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                }}
                {...ANIMATIONS.slideUp}
            >
                Why Join Us?
            </motion.h2>
            <div className="row g-4">
                {features.map((feature, index) => (
                    <div key={feature.title} className="col-md-4">
                        <motion.div
                            className="card h-100 border-0 shadow-sm"
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ 
                                duration: 0.35,
                                delay: index * 0.15
                            }}
                            whileHover={{ 
                                y: -10,
                                transition: { duration: 0.15 }
                            }}
                        >
                            <div className="card-body text-center p-4">
                                <motion.div
                                    className="display-4 mb-3"
                                    initial={{ scale: 0.5 }}
                                    whileInView={{ scale: 1 }}
                                    transition={{ 
                                        duration: 0.35,
                                        delay: index * 0.15 + 0.2
                                    }}
                                >
                                    {feature.icon}
                                </motion.div>
                                <h3 className="h4 mb-3">{feature.title}</h3>
                                <p className="text-muted mb-0">{feature.description}</p>
                            </div>
                        </motion.div>
                    </div>
                ))}
            </div>
        </div>
    );
}