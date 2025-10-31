'use client';
import { getCheckoutDetails , resendEmail } from '@/app/components/send-email.jsx';
import { useEffect } from 'react';
export default function Success() {

  useEffect(() => {
    async function fetchCheckoutDetails() {
      const urlParams = new URLSearchParams(window.location.search);
      const sessionId = urlParams.get('session_id');
      if (sessionId) {
        try {
          const lineItems = await getCheckoutDetails(sessionId);
          const email = lineItems[0]?.description; 
          if (email) {
            await resendEmail(email);
          }
        } catch (error) {
          console.error('Error fetching checkout details or sending email:', error);
        }
      }
    }
    fetchCheckoutDetails();
  }, []);
 

  return <div>
    <h1>Stripe API Success Endpoint</h1>
     
  
  </div>;
}