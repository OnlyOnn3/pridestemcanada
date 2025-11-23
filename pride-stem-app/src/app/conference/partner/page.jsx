"use client";
/**
 * Partnership Opportunities Page
 * 
 * Information for organizations interested in partnering with Pride STEM Canada Conference.
 * Route: /conference/partner
 */

import styles from "../../register/register.module.css";

export default function PartnerPage() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Partnership Opportunities</h1>
                <p>Support 2SLGBTQ+ excellence in STEM</p>
            </div>

            <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
                <section style={{ marginBottom: '3rem' }}>
                    <h2 style={{ color: '#1a1a1a', marginBottom: '1rem' }}>Partner With Us</h2>
                    <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                        Join us in creating an inclusive STEM community. Partnership opportunities are available 
                        for organizations committed to supporting 2SLGBTQ+ individuals in science, technology, 
                        engineering, and mathematics.
                    </p>
                </section>

                {/* Partnership Tiers */}
                <section style={{ marginBottom: '3rem' }}>
                    <h3 style={{ color: '#1a1a1a', marginBottom: '1.5rem' }}>Partnership Levels</h3>
                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        
                        {/* Platinum Tier */}
                        <div style={{ 
                            background: 'linear-gradient(135deg, #E5E4E2 0%, #F5F5F5 100%)',
                            padding: '2rem', 
                            borderRadius: '8px',
                            border: '2px solid #C0C0C0'
                        }}>
                            <h4 style={{ marginBottom: '0.5rem', fontSize: '1.3rem' }}>Platinum Partner</h4>
                            <p style={{ color: '#666', fontSize: '0.95rem' }}>
                                Premier sponsorship with maximum visibility and exclusive benefits
                            </p>
                        </div>

                        {/* Gold Tier */}
                        <div style={{ 
                            background: 'linear-gradient(135deg, #FFD700 0%, #FFF8DC 100%)',
                            padding: '2rem', 
                            borderRadius: '8px',
                            border: '2px solid #DAA520'
                        }}>
                            <h4 style={{ marginBottom: '0.5rem', fontSize: '1.3rem' }}>Gold Partner</h4>
                            <p style={{ color: '#666', fontSize: '0.95rem' }}>
                                Premium sponsorship with prominent branding and networking opportunities
                            </p>
                        </div>

                        {/* Silver Tier */}
                        <div style={{ 
                            background: 'linear-gradient(135deg, #C0C0C0 0%, #F0F0F0 100%)',
                            padding: '2rem', 
                            borderRadius: '8px',
                            border: '2px solid #A9A9A9'
                        }}>
                            <h4 style={{ marginBottom: '0.5rem', fontSize: '1.3rem' }}>Silver Partner</h4>
                            <p style={{ color: '#666', fontSize: '0.95rem' }}>
                                Supporting sponsorship with recognition and engagement benefits
                            </p>
                        </div>

                        {/* Bronze Tier */}
                        <div style={{ 
                            background: 'linear-gradient(135deg, #CD7F32 0%, #F5DEB3 100%)',
                            padding: '2rem', 
                            borderRadius: '8px',
                            border: '2px solid #B8860B'
                        }}>
                            <h4 style={{ marginBottom: '0.5rem', fontSize: '1.3rem' }}>Bronze Partner</h4>
                            <p style={{ color: '#666', fontSize: '0.95rem' }}>
                                Community sponsorship with acknowledgment and appreciation
                            </p>
                        </div>
                    </div>
                </section>

                {/* Contact CTA */}
                <div style={{ 
                    background: 'linear-gradient(135deg, rgba(228, 3, 3, 0.05), rgba(85, 205, 252, 0.05))',
                    padding: '2rem', 
                    borderRadius: '8px',
                    border: '1px solid #e0e0e0',
                    textAlign: 'center'
                }}>
                    <h3 style={{ marginBottom: '1rem' }}>Interested in Partnering?</h3>
                    <p style={{ color: '#666', marginBottom: '1.5rem' }}>
                        Contact us to learn more about partnership opportunities and benefits.
                    </p>
                    <a 
                        href="/conference/contact" 
                        style={{ 
                            display: 'inline-block',
                            background: '#2563eb',
                            color: 'white',
                            padding: '0.75rem 2rem',
                            borderRadius: '999px',
                            textDecoration: 'none',
                            fontWeight: '600',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        Get in Touch
                    </a>
                </div>
            </div>
        </div>
    );
}
