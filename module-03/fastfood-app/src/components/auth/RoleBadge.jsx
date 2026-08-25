import { useState } from "react";
import { useAuth } from "../../contextapi/AuthContext";
import { useCart } from "../../contextapi/CartContext";
import AuthModal from "./AuthModal";

export default function RoleBadge() {
    const { currentUser, userProfile, role, logout } = useAuth();
    const { showToast } = useCart();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [authModalOpen, setAuthModalOpen] = useState(false);

    const getRoleTag = (r) => {
        switch (r) {
            case "admin":
                return { label: "👑 Admin", color: "bg-purple-100 text-purple-800 border-purple-200" };
            case "cashier":
                return { label: "🏪 Cashier", color: "bg-blue-100 text-blue-800 border-blue-200" };
            case "kitchen":
                return { label: "👨‍🍳 Kitchen", color: "bg-amber-100 text-amber-800 border-amber-200" };
            case "customer":
                return { label: "👤 Diner", color: "bg-emerald-100 text-emerald-800 border-emerald-200" };
            default:
                return { label: "Guest", color: "bg-gray-100 text-gray-700 border-gray-200" };
        }
    };

    const currentTag = getRoleTag(role);

    // If not signed in, show simple Sign In action
    if (!currentUser) {
        return (
            <>
                <button
                    type="button"
                    onClick={() => setAuthModalOpen(true)}
                    className="flex items-center gap-1.5 bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200 text-xs font-bold px-3 py-2 rounded-xl transition cursor-pointer"
                >
                    <span>🔑</span>
                    <span>Sign In</span>
                </button>

                <AuthModal
                    isOpen={authModalOpen}
                    onClose={() => setAuthModalOpen(false)}
                />
            </>
        );
    }

    return (
        <div className="relative">
            {/* Authenticated User Badge */}
            <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 border border-gray-200 px-3 py-1.5 rounded-xl transition cursor-pointer"
            >
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 text-white font-black text-[10px] flex items-center justify-center">
                    {userProfile?.displayName?.charAt(0).toUpperCase() || currentUser?.email?.charAt(0).toUpperCase() || "U"}
                </div>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-md border ${currentTag.color}`}>
                    {currentTag.label}
                </span>
                <span className="text-[10px] text-gray-400">▼</span>
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 p-3 z-50 animate-fadeIn space-y-3 text-xs">
                    <div className="border-b border-gray-100 pb-2">
                        <div className="font-bold text-gray-900 truncate">
                            {userProfile?.displayName || currentUser?.displayName || "FlameBite User"}
                        </div>
                        <div className="text-[10px] text-gray-500 truncate">
                            {currentUser?.email || userProfile?.email}
                        </div>
                        <div className="mt-1">
                            <span className={`text-[9px] font-black px-1.5 py-0.5 rounded border ${currentTag.color}`}>
                                Role: {role.toUpperCase()}
                            </span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-1 flex flex-col gap-1">
                        <button
                            type="button"
                            onClick={() => {
                                logout();
                                setDropdownOpen(false);
                                showToast("Signed out successfully", "info");
                            }}
                            className="w-full text-left font-bold text-red-600 hover:bg-red-50 p-2 rounded-xl transition cursor-pointer"
                        >
                            🚪 Sign Out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
