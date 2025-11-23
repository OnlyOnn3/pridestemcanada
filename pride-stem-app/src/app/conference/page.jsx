/**
 * Conference Page (Main Registration Page)
 * 
 * This is the main route handler for /conference
 * Since register == conference, this page displays the registration form.
 * 
 * Route: /conference
 * Query Parameters:
 * - payment=success&session_id=xxx - Payment successful, shows green alert
 * - payment=failure - Payment cancelled/failed, shows red alert
 * 
 * Sub-routes:
 * - /conference/schedule - Conference schedule and agenda
 * - /conference/present - Call for presentations
 * - /conference/partner - Partnership opportunities
 * - /conference/contact - Conference-specific contact
 */

'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { db } from "../firebaseConfig";
import { collection, query, where, getDocs, updateDoc, doc, addDoc } from "firebase/firestore";
import RegistrationForm from "../register/registrationForm";

export default function ConferencePage() {
    const searchParams = useSearchParams();
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        const paymentStatus = searchParams.get('payment');
        const sessionId = searchParams.get('session_id');

        if (paymentStatus === 'success' && sessionId) {
            // Show success alert
            setAlert({ type: 'success', message: 'Payment Successful! Your registration is complete.' });
            
            // Finalize registration in Firebase
            finalizeRegistration(sessionId);
            
            // Clear URL parameters after 5 seconds
            setTimeout(() => {
                window.history.replaceState({}, '', '/conference');
            }, 5000);
        } else if (paymentStatus === 'failure') {
            // Show failure alert
            setAlert({ 
                type: 'failure', 
                message: 'Payment Cancelled. Your payment was not completed. Your registration was not processed.' 
            });
            
            // Clear URL parameters after 5 seconds
            setTimeout(() => {
                window.history.replaceState({}, '', '/conference');
            }, 5000);
        }
    }, [searchParams]);

    /**
     * Finalize the registration after successful payment
     * This function runs when payment=success is detected
     */
    async function finalizeRegistration(sessionId) {
        try {
            // Find the pending registration in Firebase
            const q = query(
                collection(db, "registrations_pending"), 
                where("sessionId", "==", sessionId)
            );
            const querySnapshot = await getDocs(q);

            // Update each matching registration
            querySnapshot.forEach(async (document) => {
                // Update the status in the pending collection
                const docRef = doc(db, "registrations_pending", document.id);
                await updateDoc(docRef, { 
                    status: "paid",
                    paidAt: new Date()
                });
                
                // Copy to main registrations collection
                await addDoc(collection(db, "registrations"), {
                    ...document.data(),
                    status: "paid",
                    paidAt: new Date(),
                });
            });
        } catch (error) {
            console.error("Registration finalization error:", error);
        }
    }

    // Auto-dismiss alert after 10 seconds
    useEffect(() => {
        if (alert) {
            const timer = setTimeout(() => {
                setAlert(null);
            }, 10000);
            return () => clearTimeout(timer);
        }
    }, [alert]);

    return (
        <>
            {/* Payment Status Alert */}
            {alert && (
                <div style={{
                    position: 'fixed',
                    top: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    padding: '16px 24px',
                    borderRadius: '8px',
                    backgroundColor: alert.type === 'success' ? '#10b981' : '#ef4444',
                    color: 'white',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    zIndex: 9999,
                    maxWidth: '90%',
                    width: '500px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    animation: 'slideDown 0.3s ease-out',
                    fontSize: '16px',
                    fontWeight: '500'
                }}>
                    <span>{alert.message}</span>
                    <button 
                        onClick={() => setAlert(null)}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'white',
                            fontSize: '20px',
                            cursor: 'pointer',
                            marginLeft: '16px',
                            padding: '0 8px'
                        }}
                    >
                        ×
                    </button>
                </div>
            )}
            
            {/* Add CSS animation */}
            <style jsx>{`
                @keyframes slideDown {
                    from {
                        transform: translateX(-50%) translateY(-100px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(-50%) translateY(0);
                        opacity: 1;
                    }
                }
            `}</style>

            <RegistrationForm />
        </>
    );
}
