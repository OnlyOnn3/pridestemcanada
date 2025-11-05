'use client';
import { useEffect } from 'react';
import { db } from "../../firebaseConfig";
import { collection, query, where, getDocs, updateDoc, doc, addDoc } from "firebase/firestore";

export default function Success() {
  useEffect(() => {
    async function finalizeRegistration() {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const sessionId = urlParams.get('session_id');
        if (!sessionId) return;
        const q = query(collection(db, "registrations_pending"), where("sessionId", "==", sessionId));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(async (document) => {
          const docRef = doc(db, "registrations_pending", document.id);
          await updateDoc(docRef, { status: "paid", paidAt: new Date() });
          await addDoc(collection(db, "registrations"), {
            ...document.data(),
            status: "paid",
            paidAt: new Date(),
          });
        });

      } catch (error) {
        console.error("Registration error.", error);
      }
    }

    finalizeRegistration();
  }, []);

  return <h1>Payment Successful! Your registration is complete.</h1>;
}
