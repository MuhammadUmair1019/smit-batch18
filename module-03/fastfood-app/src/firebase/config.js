import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase Configuration from Vite Environment variables or fallback defaults
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDummyKeyForDemoMode1234567890",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "flamebite-fastfood.firebaseapp.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "flamebite-fastfood",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "flamebite-fastfood.appspot.com",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789012",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789012:web:abcdef1234567890",
};

// Initialize Firebase App safely (singleton pattern)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
