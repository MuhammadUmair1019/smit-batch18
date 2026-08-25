import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useRestaurant } from "../../contextapi/RestaurantContext";
import { useAuth } from "../../contextapi/AuthContext";
import RoleBadge from "../auth/RoleBadge";

export default function DashboardLayout() {
    const { analytics, isLiveFirestore } = useRestaurant();
    const { role } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const allNavItems = [
        { path: "/dashboard", label: "Overview & Sales", icon: "📊", badge: null, roles: ["admin"] },
        { path: "/dashboard/pos", label: "POS Terminal", icon: "⚡", badge: "Live", roles: ["admin", "cashier"] },
        {
            path: "/dashboard/orders",
            label: "Kitchen & Orders",
            icon: "👨‍🍳",
            badge: analytics.activeKitchenOrders > 0 ? `${analytics.activeKitchenOrders}` : null,
            roles: ["admin", "cashier", "kitchen", "delivery"],
        },
        { path: "/dashboard/menu", label: "Menu & Inventory", icon: "🍔", badge: null, roles: ["admin"] },
    ];

    const authorizedNavItems = allNavItems.filter((item) => item.roles.includes(role) || role === "admin");

    return (
        <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row text-gray-900 font-sans">
            {/* Mobile Header */}
            <div className="md:hidden bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800">
                <Link to="/dashboard" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-orange-500 flex items-center justify-center font-bold">
                        🔥
                    </div>
                    <span className="font-black text-lg">
                        Flame<span className="text-orange-500">POS</span>
                    </span>
                </Link>

                <div className="flex items-center gap-2">
                    <RoleBadge />
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 rounded-lg bg-slate-800 text-gray-300 hover:text-white"
                    >
                        ☰
                    </button>
                </div>
            </div>

            {/* Sidebar Navigation */}
            <aside
                className={`fixed md:sticky top-0 left-0 z-40 w-64 h-screen bg-slate-900 text-slate-300 flex flex-col justify-between p-5 transition-transform duration-300 shrink-0 ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                }`}
            >
                <div className="space-y-6">
                    {/* Brand & Connection Badge */}
                    <div className="pb-4 border-b border-slate-800 space-y-2">
                        <Link to="/dashboard" className="flex items-center gap-2.5">
                            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-xl shadow-md">
                                🔥
                            </div>
                            <div>
                                <span className="text-lg font-black tracking-tight text-white block">
                                    Flame<span className="text-orange-500">Bite</span>
                                </span>
                                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                                    Management & POS
                                </span>
                            </div>
                        </Link>

                        <div className="flex items-center justify-between text-[10px] bg-slate-950 p-2 rounded-xl border border-slate-800">
                            <span className="text-gray-400">Database:</span>
                            <span className={`font-bold flex items-center gap-1 ${isLiveFirestore ? "text-emerald-400" : "text-amber-400"}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${isLiveFirestore ? "bg-emerald-400" : "bg-amber-400"} animate-pulse`}></span>
                                {isLiveFirestore ? "Cloud Firestore Live" : "Local Sync Mode"}
                            </span>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <nav className="space-y-1.5">
                        {authorizedNavItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.path === "/dashboard"}
                                onClick={() => setIsSidebarOpen(false)}
                                className={({ isActive }) =>
                                    `flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all ${
                                        isActive
                                            ? "bg-orange-500 text-white shadow-lg shadow-orange-500/25"
                                            : "hover:bg-slate-800 text-slate-400 hover:text-white"
                                    }`
                                }
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-base">{item.icon}</span>
                                    <span>{item.label}</span>
                                </div>
                                {item.badge && (
                                    <span className="text-[10px] font-black bg-white/20 text-white px-2 py-0.5 rounded-full">
                                        {item.badge}
                                    </span>
                                )}
                            </NavLink>
                        ))}
                    </nav>
                </div>

                {/* Bottom Profile & Switcher */}
                <div className="space-y-3 pt-4 border-t border-slate-800">
                    <Link
                        to="/"
                        className="flex items-center justify-center gap-2 w-full bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold py-2.5 px-3 rounded-xl transition shadow-xs"
                    >
                        <span>🌐 View Online Store</span>
                    </Link>

                    <div className="pt-1">
                        <RoleBadge />
                    </div>
                </div>
            </aside>

            {/* Main Content View */}
            <main className="flex-1 p-4 sm:p-8 lg:p-10 overflow-y-auto max-h-screen">
                <Outlet />
            </main>
        </div>
    );
}
