"use client";
/**
 * Conference Schedule Page
 * 
 * Displays the complete schedule and agenda for the Pride STEM Canada Conference.
 * Route: /conference/schedule
 */



import styles from "../../register/register.module.css";

export default function SchedulePage() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Conference Schedule</h1>
                <p>6th Annual Canadian 2SLGBTQ+ in STEM Conference</p>
            </div>

            <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
                <section style={{ marginBottom: '3rem' }}>
                    <h2 style={{ color: '#1a1a1a', marginBottom: '1rem' }}>Conference Agenda</h2>
                    <p style={{ color: '#666', lineHeight: '1.6' }}>
                        The complete schedule for our conference will be posted here soon. 
                        Stay tuned for exciting keynote speakers, panel discussions, and networking opportunities.
                    </p>
                </section>

                {/* Placeholder for schedule content */}
                <div style={{ 
                    background: '#f9f9f9', 
                    padding: '2rem', 
                    borderRadius: '8px',
                    border: '1px solid #e0e0e0'
                }}>
                    <h3 style={{ marginBottom: '1rem' }}>Coming Soon</h3>
                    <p style={{ color: '#666', marginBottom: '1rem' }}>
                        Our conference schedule is being finalized. Check back soon for:
                    </p>
                    <ul style={{ color: '#666', lineHeight: '1.8', paddingLeft: '2rem' }}>
                        <li>Keynote speaker sessions</li>
                        <li>Panel discussions and workshops</li>
                        <li>Networking events</li>
                        <li>Social activities</li>
                        <li>Career fair</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
