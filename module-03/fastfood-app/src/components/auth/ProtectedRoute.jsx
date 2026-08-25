import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contextapi/AuthContext";
import AuthModal from "./AuthModal";

export default function ProtectedRoute({ allowedRoles = [], children }) {
    const { currentUser, role, logout } = useAuth();
    const [authModalOpen, setAuthModalOpen] = useState(false);

    console.log("currentUser", currentUser)

    const isAuthorized = currentUser && (allowedRoles.length === 0 || allowedRoles.includes(role));

    if (!isAuthorized) {
        return (
            <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
                <div className="bg-slate-950 border border-slate-800 rounded-3xl max-w-md w-full p-8 shadow-2xl text-center space-y-6">
                    <div className="w-16 h-16 bg-red-500/10 text-red-400 border border-red-500/20 rounded-2xl flex items-center justify-center mx-auto text-3xl">
                        🔒
                    </div>

                    <div className="space-y-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-red-400 bg-red-950 px-3 py-1 rounded-full border border-red-800">
                            Staff Authorization Required
                        </span>
                        <h2 className="text-2xl font-black text-white">
                            {!currentUser ? "Sign In Required" : "Access Restricted"}
                        </h2>
                        <p className="text-xs text-gray-400 leading-relaxed">
                            {!currentUser
                                ? `Please sign in with an authorized staff account (${allowedRoles.join(", ")}) to access this terminal.`
                                : `This section requires ${allowedRoles.map((r) => r.toUpperCase()).join(" or ")} privileges. Your account currently has the ${role.toUpperCase()} role.`}
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="space-y-2.5 pt-2">
                        <button
                            type="button"
                            onClick={() => setAuthModalOpen(true)}
                            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs py-3 rounded-xl transition shadow-md cursor-pointer"
                        >
                            {!currentUser ? "Sign In to FlameBite" : "Sign In with Authorized Account"}
                        </button>

                        {currentUser && (
                            <button
                                type="button"
                                onClick={() => logout()}
                                className="w-full bg-slate-800 hover:bg-slate-700 text-gray-300 font-bold text-xs py-2.5 rounded-xl transition cursor-pointer"
                            >
                                Sign Out
                            </button>
                        )}

                        <Link
                            to="/"
                            className="block w-full text-center text-xs text-gray-500 hover:text-gray-300 font-semibold py-2"
                        >
                            &larr; Return to Customer Store
                        </Link>
                    </div>
                </div>

                <AuthModal
                    isOpen={authModalOpen}
                    onClose={() => setAuthModalOpen(false)}
                />
            </div>
        );
    }

    return children;
}
