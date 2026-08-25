import { useState } from "react";
import { Link } from "react-router-dom";
import { useRestaurant } from "../../contextapi/RestaurantContext";
import { useCart } from "../../contextapi/CartContext";
import { seedFirestoreDatabase } from "../../firebase/seedFirestore";

export default function DashboardOverview() {
    const { orders, analytics } = useRestaurant();
    const { showToast } = useCart();
    const [isSeeding, setIsSeeding] = useState(false);

    const handleSeedData = async () => {
        setIsSeeding(true);
        const res = await seedFirestoreDatabase();
        setIsSeeding(false);
        if (res.success) {
            showToast(`🔥 Firestore Seeded! Added ${res.menuCount} dishes, ${res.categoryCount} categories, and coupons.`, "success");
        } else {
            showToast(`Seed notice: ${res.error || "Completed with local fallback"}`, "info");
        }
    };

    const recentOrders = orders.slice(0, 5);

    const getStatusBadge = (status) => {
        switch (status) {
            case "pending":
                return "bg-amber-100 text-amber-800 border-amber-300";
            case "in_kitchen":
                return "bg-sky-100 text-sky-800 border-sky-300 animate-pulse";
            case "ready":
                return "bg-emerald-100 text-emerald-800 border-emerald-300";
            case "completed":
                return "bg-gray-100 text-gray-700 border-gray-200";
            default:
                return "bg-gray-100 text-gray-700 border-gray-200";
        }
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                        Restaurant Performance & Sales
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        Real-time revenue, kitchen workload, and channel distribution analytics.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={handleSeedData}
                        disabled={isSeeding}
                        className="bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 font-bold text-xs px-3.5 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-1.5"
                    >
                        <span>{isSeeding ? "⏳ Seeding..." : "🌱 Seed Firestore"}</span>
                    </button>
                    <Link
                        to="/dashboard/pos"
                        className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md shadow-orange-500/20 flex items-center gap-2 cursor-pointer transition active:scale-95"
                    >
                        <span>⚡ Launch POS Terminal</span>
                    </Link>
                </div>
            </div>

            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* 1. Gross Revenue */}
                <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-xs space-y-2">
                    <div className="flex items-center justify-between text-gray-500 text-xs font-bold">
                        <span>TODAY'S REVENUE</span>
                        <span className="text-lg">💰</span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-gray-900">
                        Rs. {analytics.totalRevenue.toLocaleString()}
                    </div>
                    <div className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                        <span>↑ 18.4%</span>
                        <span className="text-gray-400 font-normal">vs yesterday</span>
                    </div>
                </div>

                {/* 2. Total Orders */}
                <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-xs space-y-2">
                    <div className="flex items-center justify-between text-gray-500 text-xs font-bold">
                        <span>TOTAL ORDERS</span>
                        <span className="text-lg">🧾</span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-gray-900">
                        {analytics.totalOrders}
                    </div>
                    <div className="text-[11px] text-gray-500 flex items-center gap-2">
                        <span>🏪 {analytics.posOrdersCount} POS</span>
                        <span>•</span>
                        <span>🌐 {analytics.onlineOrdersCount} Online</span>
                    </div>
                </div>

                {/* 3. Active Kitchen Pipeline */}
                <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-xs space-y-2">
                    <div className="flex items-center justify-between text-gray-500 text-xs font-bold">
                        <span>ACTIVE KITCHEN</span>
                        <span className="text-lg">👨‍🍳</span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-orange-600">
                        {analytics.activeKitchenOrders} Orders
                    </div>
                    <div className="text-[11px] text-orange-600 font-bold">
                        <Link to="/dashboard/orders" className="hover:underline">
                            View Live Pipeline &rarr;
                        </Link>
                    </div>
                </div>

                {/* 4. Average Ticket */}
                <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-xs space-y-2">
                    <div className="flex items-center justify-between text-gray-500 text-xs font-bold">
                        <span>AVG TICKET SIZE</span>
                        <span className="text-lg">📊</span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-gray-900">
                        Rs. {analytics.avgOrderValue.toLocaleString()}
                    </div>
                    <div className="text-[11px] text-gray-500">Per customer order</div>
                </div>
            </div>

            {/* Quick Action Navigation Tiles */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <Link
                    to="/dashboard/pos"
                    className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 text-white shadow-xl hover:shadow-2xl transition hover:-translate-y-1 flex flex-col justify-between space-y-4 border border-slate-700"
                >
                    <div className="space-y-2">
                        <div className="w-10 h-10 rounded-2xl bg-orange-500 text-white flex items-center justify-center text-xl font-bold shadow-md">
                            ⚡
                        </div>
                        <h3 className="text-lg font-black">Fast POS Cashier Register</h3>
                        <p className="text-xs text-gray-300 leading-relaxed">
                            Take in-store walk-in, dine-in, and takeaway orders with instant cash change calculator and thermal receipt printing.
                        </p>
                    </div>
                    <span className="text-xs font-bold text-orange-400 flex items-center gap-1">
                        Open POS Screen &rarr;
                    </span>
                </Link>

                <Link
                    to="/dashboard/orders"
                    className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm hover:shadow-xl transition hover:-translate-y-1 flex flex-col justify-between space-y-4"
                >
                    <div className="space-y-2">
                        <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center text-xl font-bold">
                            👨‍🍳
                        </div>
                        <h3 className="text-lg font-black text-gray-900">Kitchen Display System (KDS)</h3>
                        <p className="text-xs text-gray-500 leading-relaxed">
                            Live workflow queue for cooks and dispatchers to accept online and counter tickets, advance status, and manage prep.
                        </p>
                    </div>
                    <span className="text-xs font-bold text-sky-600 flex items-center gap-1">
                        Open Kitchen Pipeline &rarr;
                    </span>
                </Link>

                <Link
                    to="/dashboard/menu"
                    className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm hover:shadow-xl transition hover:-translate-y-1 flex flex-col justify-between space-y-4"
                >
                    <div className="space-y-2">
                        <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-xl font-bold">
                            🍔
                        </div>
                        <h3 className="text-lg font-black text-gray-900">Menu & Inventory Editor</h3>
                        <p className="text-xs text-gray-500 leading-relaxed">
                            Add gourmet dishes, adjust prices, edit descriptions, and update live stock availability on customer site.
                        </p>
                    </div>
                    <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
                        Manage Food Catalog &rarr;
                    </span>
                </Link>
            </div>

            {/* Split View: Top Sellers & Live Activity Feed */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Top Selling Items (5 cols) */}
                <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-gray-200 shadow-xs space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-base font-black text-gray-900 flex items-center gap-2">
                            <span>🏆</span>
                            <span>Top Selling Dishes</span>
                        </h3>
                        <span className="text-xs text-gray-400 font-bold">By Volume</span>
                    </div>

                    <div className="divide-y divide-gray-100 space-y-1">
                        {analytics.topSellingItems.map((item, idx) => (
                            <div key={idx} className="pt-3 pb-2 flex items-center justify-between text-xs">
                                <div className="flex items-center gap-3">
                                    <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-700 font-black flex items-center justify-center text-[10px]">
                                        #{idx + 1}
                                    </span>
                                    <div>
                                        <div className="font-bold text-gray-900">{item.title}</div>
                                        <div className="text-[10px] text-gray-400">
                                            {item.count} orders placed
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right font-black text-gray-900">
                                    Rs. {item.revenue.toLocaleString()}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Orders Live Stream (7 cols) */}
                <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-gray-200 shadow-xs space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-base font-black text-gray-900 flex items-center gap-2">
                            <span>🕒</span>
                            <span>Recent Activity Stream</span>
                        </h3>
                        <Link to="/dashboard/orders" className="text-xs font-bold text-orange-600 hover:underline">
                            View All ({orders.length}) &rarr;
                        </Link>
                    </div>

                    <div className="divide-y divide-gray-100 space-y-1">
                        {recentOrders.map((order) => (
                            <div key={order.orderId} className="pt-3 pb-2 flex items-center justify-between text-xs">
                                <div className="space-y-0.5">
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono font-bold text-gray-900">{order.orderId}</span>
                                        <span
                                            className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${
                                                order.source === "online"
                                                    ? "bg-purple-50 text-purple-700 border-purple-200"
                                                    : "bg-blue-50 text-blue-700 border-blue-200"
                                            }`}
                                        >
                                            {order.source === "online" ? "Online" : "POS"}
                                        </span>
                                    </div>
                                    <div className="text-gray-600">{order.customerName} • {order.items?.length} items</div>
                                </div>

                                <div className="text-right space-y-1">
                                    <div className="font-black text-gray-900">
                                        Rs. {order.totalAmount.toLocaleString()}
                                    </div>
                                    <span
                                        className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded-md border ${getStatusBadge(
                                            order.status
                                        )}`}
                                    >
                                        {order.status.replace("_", " ")}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
