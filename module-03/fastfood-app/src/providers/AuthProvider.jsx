import { useState, useEffect } from "react";
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db, googleProvider } from "../firebase/config";
import { AuthContext } from "../contextapi/AuthContext";

export default function AuthProvider({ children }) {
    // Current Firebase Auth user
    const [currentUser, setCurrentUser] = useState(null);
    // User profile from Firestore: { uid, email, displayName, role, phone, ... }
    const [userProfile, setUserProfile] = useState(() => {
        try {
            const cached = localStorage.getItem("flamebite_auth_profile");
            return cached ? JSON.parse(cached) : null;
        } catch {
            return null;
        }
    });

    const [loading, setLoading] = useState(true);

    // Save profile to localStorage cache
    useEffect(() => {
        if (userProfile) {
            try {
                localStorage.setItem("flamebite_auth_profile", JSON.stringify(userProfile));
            } catch (err) {
                console.error("Failed caching user profile", err);
            }
        } else {
            localStorage.removeItem("flamebite_auth_profile");
        }
    }, [userProfile]);

    // Fetch user profile from Firestore or initialize upon first sign-in
    const syncUserProfile = async (user, initialRole = null) => {
        if (!user) {
            setUserProfile(null);
            localStorage.removeItem("flamebite_auth_profile");
            return;
        }

        try {
            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                const data = userSnap.data();
                setUserProfile(data);
            } else {
                // Initial role for new accounts: if provided or if email has 'admin', otherwise 'customer'
                const assignedRole = initialRole || (user.email?.toLowerCase().includes("admin") ? "admin" : "customer");
                const newProfile = {
                    uid: user.uid,
                    email: user.email || "",
                    displayName: user.displayName || user.email?.split("@")[0] || "User",
                    photoURL: user.photoURL || "",
                    role: assignedRole,
                    createdAt: serverTimestamp(),
                    status: "active",
                };

                await setDoc(userRef, newProfile);
                setUserProfile(newProfile);
            }
        } catch (error) {
            console.error("Firestore user sync error:", error.message);
            const fallback = {
                uid: user.uid,
                email: user.email || "",
                displayName: user.displayName || user.email?.split("@")[0] || "User",
                role: initialRole || (user.email?.toLowerCase().includes("admin") ? "admin" : "customer"),
            };
            setUserProfile(fallback);
        }
    };

    // Firebase Auth State Listener
    useEffect(() => {
        let unsubscribe;
        try {
            unsubscribe = onAuthStateChanged(auth, async (user) => {
                setCurrentUser(user);
                if (user) {
                    await syncUserProfile(user);
                } else {
                    setUserProfile(null);
                    localStorage.removeItem("flamebite_auth_profile");
                }
                setLoading(false);
            });
        } catch (error) {
            console.error("Auth state listener error:", error.message);
        }

        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, []);

    // 1. Email & Password Login
    const login = async (email, password) => {
        try {
            const cred = await signInWithEmailAndPassword(auth, email, password);
            await syncUserProfile(cred.user);
            return { success: true, user: cred.user };
        } catch (error) {
            console.error("Login failed:", error);
            return { success: false, error: error.message };
        }
    };

    // 2. Email & Password Registration with Role
    const register = async (email, password, displayName, role = "customer") => {
        try {
            const cred = await createUserWithEmailAndPassword(auth, email, password);
            if (displayName) {
                await updateProfile(cred.user, { displayName });
            }
            await syncUserProfile(cred.user, role);
            return { success: true, user: cred.user };
        } catch (error) {
            console.error("Registration failed:", error);
            return { success: false, error: error.message };
        }
    };

    // 3. Google Sign-In
    const loginWithGoogle = async () => {
        try {
            const cred = await signInWithPopup(auth, googleProvider);
            await syncUserProfile(cred.user);
            return { success: true, user: cred.user };
        } catch (error) {
            console.error("Google Sign-In failed:", error);
            return { success: false, error: error.message };
        }
    };

    // 4. Logout
    const logout = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.warn("Sign out error", err);
        }
        setCurrentUser(null);
        setUserProfile(null);
        localStorage.removeItem("flamebite_auth_profile");
    };

    const role = userProfile?.role || (currentUser ? "customer" : "guest");
    const isAdmin = role === "admin";
    const isCashier = role === "cashier" || isAdmin;
    const isKitchen = role === "kitchen" || isAdmin;
    const isStaff = ["admin", "cashier", "kitchen", "delivery"].includes(role);

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                userProfile,
                role,
                isAdmin,
                isCashier,
                isKitchen,
                isStaff,
                loading,
                login,
                register,
                loginWithGoogle,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
