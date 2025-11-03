"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

export default function AboutPage() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="container py-5">
            <div className="bg-white p-4 rounded-3 shadow-sm">
                {/* Header Section */}
                <div className="text-center mb-5">
                    <h1
                        className="fw-bold mb-3"
                        style={{
                            background: "linear-gradient(90deg, #ff0080, #7928ca)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        Pride STEM
                    </h1>
                    <h2 className="h3 text-muted">About Our Conference</h2>
                </div>

                {/* Vision & Mission Cards */}
                <div className="row g-4">
                    <div className="col-md-6">
                        <div className="card h-100 border-0 shadow-sm">
                            <div className="card-body">
                                <h3 className="card-title fw-bold mb-3" style={{ color: "#ff0080" }}>
                                    Our Vision
                                </h3>
                                <p className="card-text">
                                    Creating an inclusive and supportive environment in STEM fields where
                                    everyone can thrive, innovate, and contribute their unique perspectives.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="card h-100 border-0 shadow-sm">
                            <div className="card-body">
                                <h3 className="card-title fw-bold mb-3" style={{ color: "#7928ca" }}>
                                    Our Mission
                                </h3>
                                <p className="card-text">
                                    To foster diversity, equity, and inclusion in STEM through education,
                                    networking, and professional development opportunities.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Button */}
                <div className="text-center mt-5">
                    <button
                        className="btn btn-lg fw-bold text-white px-5 border-0"
                        style={{
                            background: isHovered
                                ? "linear-gradient(90deg, #ff4da6, #9c4bff)"
                                : "linear-gradient(90deg, #ff0080, #7928ca)",
                            transition: "all 0.3s ease",
                        }}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        Join Our Community
                    </button>

                    <div className="mt-4">
            <span
                className="h4 fw-bold"
                style={{
                    background: "linear-gradient(90deg, #ff0080, #7928ca)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                }}
            >
              PRIDE STEM CANADA
            </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
