"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import styles from "../page.module.css";
import Link from "next/link";


export default function VendorPage() {
    const [form, setForm] = useState({ email: "", message: "" });
    const [status, setStatus] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("sending");

        try {
            const res = await fetch("/api/vendor", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus("success");
                setForm({ email: "", message: "" });
            } else {
                setStatus("error");
                console.error(data.error);
            }
        } catch (err) {
            setStatus("error");
            console.error(err);
        }
    };

    return (
        <div className="bg-white p-4 rounded-3 shadow-sm my-5 mx-auto" style={{ maxWidth: '600px' }}>
            <h3
                className="mb-4 text-center fw-bold"
                style={{
                    background: 'linear-gradient(90deg, #ff0080, #7928ca)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}
            >
                Vendors Submission
            </h3>

            <h4 className="mb-4">Want to be a vendor at the conference? Send us a message!</h4>

            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-semibold">Your Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="email@example.com"
                        className="form-control form-control-lg shadow-sm"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="message" className="form-label fw-semibold">Your Message</label>
                    <textarea
                        name="message"
                        id="message"
                        rows="5"
                        required
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Type your message here..."
                        className="form-control form-control-lg shadow-sm"
                    />
                </div>

                <div className="d-grid">
                    <button
                        type="submit"
                        disabled={status === "sending"}
                        className="btn btn-lg fw-bold text-white"
                        style={{
                            background: 'linear-gradient(90deg, #ff0080, #7928ca)',
                            transition: 'all 0.3s ease',
                        }}
                        onMouseOver={(e) => (e.target.style.filter = 'brightness(1.1)')}
                        onMouseOut={(e) => (e.target.style.filter = 'brightness(1)')}
                    >
                        {status === "sending" ? "Sending..." : "Send Message"}
                    </button>
                </div>

                {status === "success" && (
                    <div className="alert alert-success mt-3" role="alert">
                        Response sent. You will receive a confirmation email shortly.
                    </div>
                )}

                {status === "error" && (
                    <div className="alert alert-danger mt-3" role="alert">
                        Your response was not able to be submitted. Please try again later.
                    </div>
                )}
            </form>
        </div>
    );
}