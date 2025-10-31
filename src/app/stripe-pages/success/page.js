'use client';
import { useEffect } from 'react';
export default function Success() {

  useEffect(() => {
    async function fetchCheckoutDetails() {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const sessionId = urlParams.get('session_id');
      if (sessionId) {
        const response = await fetch(`/api/stripe-api/checkout-success/checkout-success-handler?sessionId=${sessionId}`);
        const data = await response.json();
        console.log('Checkout Session Data:', data);
        } 
      }catch (error) {
          console.error('Error fetching checkout details or sending email:', error);
        }
    }
    fetchCheckoutDetails();
  }, []);
 

  return (<div>
    <h1>Stripe API Success Endpoint</h1>
     
  
  </div>);
}