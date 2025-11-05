"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    occupation: "",
    affiliation: "",
    dietary: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //Stripe payment
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.occupation) {
      alert("Please select an occupation.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/stripe-api/checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ occupation: formData.occupation }),
      });

      const session = await response.json();

      if (!response.ok) {
        console.error("Error creating checkout session:", session.error);
        alert("Payment Failed, please try again.");
        setIsLoading(false);
        return;
      }

      await addDoc(collection(db, "registrations_pending"), {
        ...formData,
        status: "pending",
        sessionId: session.sessionId,
        createdAt: new Date(),
      });

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId: session.sessionId });
      if (error) {
        console.error("Stripe error", error.message);
        alert("Stripe error, please try again.");
      }

    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration error, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  //Form frontend
  return (
    <div className="bg-white p-4 rounded-3 shadow-sm">
      <h3
        className="mb-4 text-center fw-bold"
        style={{
          background: "linear-gradient(90deg, #ff0080, #7928ca)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Conference Registration
      </h3>

      <form onSubmit={handleSubmit} className="needs-validation" noValidate>
        <div className="mb-4">
          <label htmlFor="name-input" className="form-label fw-semibold">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            id="name-input"
            className="form-control form-control-lg shadow-sm"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <small id="name-help" className="form-text text-muted">
            This can be your preferred name.
          </small>
        </div>

        <div className="mb-4">
          <label htmlFor="email-input" className="form-label fw-semibold">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email-input"
            className="form-control form-control-lg shadow-sm"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="occupation-input" className="form-label fw-semibold">
            Occupation
          </label>
          <select
            name="occupation"
            id="occupation-input"
            className="form-select form-select-lg shadow-sm"
            value={formData.occupation}
            onChange={handleChange}
            required
          >
            <option value="">Select your occupation...</option>
            <option value="student">Student (CAD 50)</option>
            <option value="postdoc">Postdoc (CAD 100)</option>
            <option value="faculty">Faculty/Professional (CAD 200)</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="affiliation-input" className="form-label fw-semibold">
            Affiliation/Organization
          </label>
          <input
            type="text"
            name="affiliation"
            id="affiliation-input"
            className="form-control form-control-lg shadow-sm"
            value={formData.affiliation}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="dietary-input" className="form-label fw-semibold">
            Dietary Restrictions
          </label>
          <textarea
            name="dietary"
            id="dietary-input"
            className="form-control form-control-lg shadow-sm"
            rows="3"
            placeholder="Please list any dietary restrictions or preferences..."
            value={formData.dietary}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="d-grid">
        <button
          type="submit"
          className="btn btn-lg fw-bold text-white"
            style={{background: "linear-gradient(90deg, #ff0080, #7928ca)",border: "none",}}>Pay Now
        </button>
        </div>
      </form>
    </div>
  );
}
