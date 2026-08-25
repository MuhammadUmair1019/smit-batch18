import { useState } from "react";
import { useAuth } from "../../contextapi/AuthContext";
import { useCart } from "../../contextapi/CartContext";

export default function AuthModal({ isOpen, onClose }) {
    const { login, register, loginWithGoogle } = useAuth();
    const { showToast } = useCart();

    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [role, setRole] = useState("customer");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        setLoading(true);

        if (isSignUp) {
            const res = await register(email, password, displayName, role);
            setLoading(false);
            if (res.success) {
                showToast(`Welcome ${displayName || email}! Account created with role: ${role.toUpperCase()}`, "success");
                onClose();
            } else {
                setErrorMsg(res.error || "Registration failed. Please check details.");
            }
        } else {
            const res = await login(email, password);
            setLoading(false);
            if (res.success) {
                showToast(`Welcome back, ${res.user?.email}!`, "success");
                onClose();
            } else {
                setErrorMsg(res.error || "Invalid email or password.");
            }
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        const res = await loginWithGoogle();
        setLoading(false);
        if (res.success) {
            showToast("Signed in with Google successfully!", "success");
            onClose();
        } else {
            setErrorMsg(res.error || "Google Sign-In failed.");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-3xl top-[300px] max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center font-bold cursor-pointer"
                >
                    ✕
                </button>

                {/* Header */}
                <div className="text-center space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center mx-auto text-2xl shadow-md">
                        🔥
                    </div>
                    <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                        {isSignUp ? "Create Account" : "Sign In to FlameBite"}
                    </h2>
                    <p className="text-xs text-gray-500">
                        {isSignUp
                            ? "Register with your credentials and select your role"
                            : "Enter your Firebase credentials to access your account"}
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                    {isSignUp && (
                        <>
                            <div>
                                <label className="block font-bold text-gray-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    placeholder="e.g. Umair Arshad"
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                                />
                            </div>

                            <div>
                                <label className="block font-bold text-gray-700 mb-1">Account Role (RBAC)</label>
                                <select
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400 cursor-pointer"
                                >
                                    <option value="customer">👤 Customer (Diner)</option>
                                    <option value="cashier">🏪 Cashier (POS Terminal)</option>
                                    <option value="kitchen">👨‍🍳 Kitchen Staff (KDS)</option>
                                    <option value="admin">👑 Store Manager (Admin)</option>
                                </select>
                            </div>
                        </>
                    )}

                    <div>
                        <label className="block font-bold text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="user@example.com"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    </div>

                    <div>
                        <label className="block font-bold text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    </div>

                    {errorMsg && (
                        <p className="text-xs text-red-500 font-bold text-center bg-red-50 p-2.5 rounded-xl border border-red-200">
                            ⚠️ {errorMsg}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm py-3.5 rounded-xl shadow-md shadow-orange-500/20 transition active:scale-95 cursor-pointer disabled:opacity-50"
                    >
                        {loading ? "Processing..." : isSignUp ? "Create Account" : "Sign In"}
                    </button>
                </form>

                {/* Google Sign In */}
                <div className="space-y-3 pt-1">
                    <div className="relative flex items-center justify-center">
                        <div className="border-t border-gray-200 w-full"></div>
                        <span className="bg-white px-3 text-[10px] text-gray-400 font-bold uppercase">
                            or continue with
                        </span>
                    </div>

                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold text-xs py-2.5 rounded-xl transition cursor-pointer"
                    >
                        <span>🌐</span>
                        <span>Sign In with Google</span>
                    </button>
                </div>

                {/* Footer Switcher */}
                <div className="text-center text-xs text-gray-500 pt-2 border-t border-gray-100">
                    {isSignUp ? (
                        <span>
                            Already have an account?{" "}
                            <button
                                type="button"
                                onClick={() => {
                                    setIsSignUp(false);
                                    setErrorMsg("");
                                }}
                                className="text-orange-600 font-bold hover:underline cursor-pointer"
                            >
                                Sign In
                            </button>
                        </span>
                    ) : (
                        <span>
                            Don't have an account?{" "}
                            <button
                                type="button"
                                onClick={() => {
                                    setIsSignUp(true);
                                    setErrorMsg("");
                                }}
                                className="text-orange-600 font-bold hover:underline cursor-pointer"
                            >
                                Register Now
                            </button>
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
