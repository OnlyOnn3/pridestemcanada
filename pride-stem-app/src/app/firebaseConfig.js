/**
 * Firebase Configuration File
 * 
 * This file sets up the Firebase connection for the Pride STEM Canada website.
 * Firebase is used to store conference registration data in Firestore database.
 * 
 * Required Environment Variables (stored in .env.local):
 * - NEXT_PUBLIC_FIREBASE_API_KEY: Your Firebase API key
 * - NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: Authentication domain
 * - NEXT_PUBLIC_FIREBASE_PROJECT_ID: Firebase project identifier
 * - NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: Cloud storage bucket URL
 * - NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: For push notifications
 * - NEXT_PUBLIC_FIREBASE_APP_ID: Unique app identifier
 * 
 * Note: These credentials should be shared securely via the team communication channel.
 */

// Import Firebase SDK modules
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Analytics is commented out but available if needed in the future
// import { getAnalytics } from "firebase/analytics";

/**
 * Firebase configuration object
 * All sensitive credentials are loaded from environment variables for security.
 * The NEXT_PUBLIC_ prefix makes these available in the browser (client-side).
 */
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: "G-YN5Q5G82W0" // Google Analytics measurement ID
};

/**
 * Initialize Firebase app instance
 * This creates the connection to Firebase services using the configuration above.
 */
const app = initializeApp(firebaseConfig);

// Firebase Analytics - currently disabled but can be enabled if tracking is needed
// const analytics = getAnalytics(app);

/**
 * Firestore database instance
 * This is the main database we use to store:
 * - registrations_pending: Incomplete registrations awaiting payment
 * - registrations: Completed registrations after successful payment
 * 
 * Import this 'db' object in other files to interact with the database.
 * Example: import { db } from './firebaseConfig';
 */
export const db = getFirestore(app);
