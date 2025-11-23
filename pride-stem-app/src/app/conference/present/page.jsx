"use client";
/**
 * Call for Presentations Page
 * 
 * Information for those interested in presenting at the Pride STEM Canada Conference.
 * Route: /conference/present
 */



import styles from "../../register/register.module.css";

export default function PresentPage() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Call for Presentations</h1>
                <p>Share your research and experiences with the 2SLGBTQ+ STEM community</p>
            </div>

            <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
                <section style={{ marginBottom: '3rem' }}>
                    <h2 style={{ color: '#1a1a1a', marginBottom: '1rem' }}>Present at Our Conference</h2>
                    <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                        We welcome presentations from students, researchers, and professionals across all STEM fields. 
                        Share your research, insights, and experiences with our vibrant community.
                    </p>
                </section>

                {/* Presentation Types */}
                <section style={{ marginBottom: '3rem' }}>
                    <h3 style={{ color: '#1a1a1a', marginBottom: '1rem' }}>Presentation Formats</h3>
                    <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                        <div style={{ 
                            background: '#f9f9f9', 
                            padding: '1.5rem', 
                            borderRadius: '8px',
                            border: '1px solid #e0e0e0'
                        }}>
                            <h4 style={{ marginBottom: '0.5rem' }}>Oral Presentations</h4>
                            <p style={{ color: '#666', fontSize: '0.95rem' }}>
                                15-minute talks followed by Q&A. Perfect for sharing research findings and insights.
                            </p>
                        </div>
                        <div style={{ 
                            background: '#f9f9f9', 
                            padding: '1.5rem', 
                            borderRadius: '8px',
                            border: '1px solid #e0e0e0'
                        }}>
                            <h4 style={{ marginBottom: '0.5rem' }}>Poster Sessions</h4>
                            <p style={{ color: '#666', fontSize: '0.95rem' }}>
                                Display your research in an interactive poster format with one-on-one discussions.
                            </p>
                        </div>
                        <div style={{ 
                            background: '#f9f9f9', 
                            padding: '1.5rem', 
                            borderRadius: '8px',
                            border: '1px solid #e0e0e0'
                        }}>
                            <h4 style={{ marginBottom: '0.5rem' }}>Workshops</h4>
                            <p style={{ color: '#666', fontSize: '0.95rem' }}>
                                Interactive 45-minute sessions on specific topics or skills.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <div style={{ 
                    background: 'linear-gradient(135deg, rgba(228, 3, 3, 0.05), rgba(85, 205, 252, 0.05))',
                    padding: '2rem', 
                    borderRadius: '8px',
                    border: '1px solid #e0e0e0',
                    textAlign: 'center'
                }}>
                    <h3 style={{ marginBottom: '1rem' }}>Submission Details Coming Soon</h3>
                    <p style={{ color: '#666', marginBottom: '1rem' }}>
                        Abstract submission portal will open soon. Stay tuned for deadlines and submission guidelines.
                    </p>
                </div>
            </div>
        </div>
    );
}
