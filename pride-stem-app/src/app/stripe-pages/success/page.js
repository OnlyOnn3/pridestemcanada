/**
 * Payment Success Page
 * 
 * This page is displayed after a successful Stripe payment.
 * It finalizes the registration by:
 * 1. Reading the session_id from the URL query parameter
 * 2. Finding the matching pending registration in Firebase
 * 3. Updating its status to "paid"
 * 4. Creating a new record in the main registrations collection
 * 
 * URL Format: /stripe-pages/success?session_id=cs_test_...
 * 
 * Firebase Collections Used:
 * - registrations_pending: Temporary storage before payment (status: "pending")
 * - registrations: Final storage after successful payment (status: "paid")
 * 
 * Flow:
 * 1. User completes payment on Stripe → Stripe redirects here with session_id
 * 2. useEffect runs on page load
 * 3. Finds pending registration by session_id
 * 4. Updates status to "paid" and adds timestamp
 * 5. Copies registration to main "registrations" collection
 * 
 * Note: This runs client-side. For production, consider using Stripe webhooks
 * for more reliable payment confirmation.
 */

'use client';
import { useEffect } from 'react';
import { db } from "../../firebaseConfig";
import { collection, query, where, getDocs, updateDoc, doc, addDoc } from "firebase/firestore";

export default function Success() {
  useEffect(() => {
    /**
     * Finalize the registration after successful payment
     * This function runs once when the page loads
     */
    async function finalizeRegistration() {
      try {
        // === STEP 1: Get the Stripe session ID from URL ===
        // URL format: /stripe-pages/success?session_id=cs_test_...
        const urlParams = new URLSearchParams(window.location.search);
        const sessionId = urlParams.get('session_id');
        
        // If no session ID, user navigated here directly (not from Stripe)
        if (!sessionId) return;
        
        // === STEP 2: Find the pending registration in Firebase ===
        // Query the registrations_pending collection for matching sessionId
        const q = query(
          collection(db, "registrations_pending"), 
          where("sessionId", "==", sessionId)
        );
        const querySnapshot = await getDocs(q);

        // === STEP 3: Update each matching registration ===
        // (Should only be one, but using forEach to handle potential duplicates)
        querySnapshot.forEach(async (document) => {
          // Update the status in the pending collection
          const docRef = doc(db, "registrations_pending", document.id);
          await updateDoc(docRef, { 
            status: "paid",      // Mark as paid
            paidAt: new Date()   // Record payment timestamp
          });
          
          // === STEP 4: Copy to main registrations collection ===
          // Create a new document in the "registrations" collection
          // This is the permanent record of the completed registration
          await addDoc(collection(db, "registrations"), {
            ...document.data(),  // All original data (name, email, etc.)
            status: "paid",      // Payment confirmed
            paidAt: new Date(),  // When payment was completed
          });
        });

      } catch (error) {
        // Log any errors that occur during the process
        console.error("Registration error.", error);
      }
    }

    // Run the finalization function when component mounts
    finalizeRegistration();
  }, []); // Empty dependency array = run once on mount

  return <h1>Payment Successful! Your registration is complete.</h1>;
}
