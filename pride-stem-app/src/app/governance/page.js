"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import RegistrationForm from "../register/RegistrationForm";

export default function GovernancePage() {
    const [active, setActive] = useState(null);

    const toggleSection = (id) => {
        setActive(active === id ? null : id);
    };

    const sections = [
        {
            id: "attendee",
            title: "Attendee Information",
            content: (
                <p className="mb-0 text-dark">
                    Learn more about the conference venue, accessibility, and travel
                    details. We aim to create an inclusive, accessible environment for all
                    participants.
                </p>
            ),
        },
        {
            id: "online",
            title: "Attend Online",
            content: (
                <p className="mb-0 text-dark">
                    Can’t make it to Toronto? Attend virtually via our online platform
                    with full live streaming and interactive sessions.
                </p>
            ),
        },
        {
            id: "register",
            title: "Registration",
            content: <RegistrationForm />,
        },
        {
            id: "schedule",
            title: "Schedule",
            content: (
                <p className="mb-0 text-dark">
                    The full event schedule will be announced soon. Stay tuned for keynote
                    speakers and panel discussions from top STEM leaders.
                </p>
            ),
        },
    ];

    return (
        <div className="container py-5">
            <style jsx>{`
                .pride-gradient {
                    background: linear-gradient(90deg, #ff0080, #7928ca);
                    height: 4px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }

                .pride-btn {
                    background: linear-gradient(90deg, #ff0080, #7928ca);
                    border: none;
                    color: white;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }

                .pride-btn:hover {
                    filter: brightness(1.1);
                    transform: translateY(-2px);
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                }

                .collapse-content {
                    background-color: #ffffff;
                    border: none;
                    border-radius: 0.75rem;
                    padding: 1.5rem;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
                    margin-top: 1rem;
                }

                body {
                    background-color: #f8f9fa;
                }
            `}</style>

            {/* Header */}
            <div className="text-center text-dark mb-5">
                <h1 className="fw-bold">
                    Join us for the 6th Annual Canadian 2SLGBTQ+ in STEM Conference!
                </h1>
                <p className="text-secondary fs-5">
                    Hosted in Toronto, this conference connects innovators and leaders to
                    celebrate diversity, inclusion, and excellence in STEM. 🌈
                </p>
            </div>

            {/* Accordion Buttons */}
            <div className="mx-auto" style={{ maxWidth: "800px" }}>
                {sections.map((section) => (
                    <div key={section.id} className="mb-3">
                        <button
                            className={`btn pride-btn w-100 fw-semibold py-3 rounded-3 ${
                                active === section.id ? "opacity-100" : "opacity-90"
                            }`}
                            onClick={() => toggleSection(section.id)}
                        >
                            {section.title}
                        </button>

                        {active === section.id && (
                            <div className="collapse-content mt-2 shadow-sm">
                                {section.content}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
