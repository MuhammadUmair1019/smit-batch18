import { useState, useMemo } from "react";
import { useRestaurant } from "../../contextapi/RestaurantContext";
import { useCart } from "../../contextapi/CartContext";
import ThermalReceiptModal from "../../components/dashboard/ThermalReceiptModal";

export default function OrdersManager() {
    const { orders, updateOrderStatus, cancelOrder } = useRestaurant();
    const { showToast } = useCart();

    const [statusFilter, setStatusFilter] = useState("all");
    const [sourceFilter, setSourceFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    // Receipt Modal
    const [selectedReceiptOrder, setSelectedReceiptOrder] = useState(null);
    const [isReceiptOpen, setIsReceiptOpen] = useState(false);

    const filteredOrders = useMemo(() => {
        return orders.filter((order) => {
            const matchesStatus = statusFilter === "all" || order.status === statusFilter;
            const matchesSource = sourceFilter === "all" || order.source === sourceFilter;
            const matchesSearch =
                order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (order.phone && order.phone.includes(searchQuery));
            return matchesStatus && matchesSource && matchesSearch;
        });
    }, [orders, statusFilter, sourceFilter, searchQuery]);

    const handleAdvanceStatus = (order) => {
        if (order.status === "pending") {
            updateOrderStatus(order.orderId, "in_kitchen");
            showToast(`Order ${order.orderId} sent to Kitchen!`, "info");
        } else if (order.status === "in_kitchen") {
            updateOrderStatus(order.orderId, "ready");
            showToast(`Order ${order.orderId} marked as Ready!`, "success");
        } else if (order.status === "ready") {
            updateOrderStatus(order.orderId, "completed");
            showToast(`Order ${order.orderId} Completed!`, "success");
        }
    };

    const handlePrintReceipt = (order) => {
        setSelectedReceiptOrder(order);
        setIsReceiptOpen(true);
    };

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
            case "cancelled":
                return "bg-rose-100 text-rose-800 border-rose-300";
            default:
                return "bg-gray-100 text-gray-700 border-gray-200";
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case "pending":
                return "🟡 New / Pending";
            case "in_kitchen":
                return "👨‍🍳 Cooking in Kitchen";
            case "ready":
                return "🟢 Ready for Dispatch";
            case "completed":
                return "✅ Completed";
            case "cancelled":
                return "❌ Cancelled";
            default:
                return status;
        }
    };

    return (
        <div className="space-y-6">
            {/* Header & Stats Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight">
                        Live Kitchen & Order Pipeline
                    </h1>
                    <p className="text-xs text-gray-500 mt-0.5">
                        Manage incoming orders from online customers and in-store POS cash registers.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs font-bold bg-orange-100 text-orange-800 px-3 py-1.5 rounded-xl border border-orange-200">
                        Total Orders: {orders.length}
                    </span>
                    <span className="text-xs font-bold bg-sky-100 text-sky-800 px-3 py-1.5 rounded-xl border border-sky-200">
                        Active Kitchen: {orders.filter((o) => o.status === "in_kitchen" || o.status === "pending").length}
                    </span>
                </div>
            </div>

            {/* Filter Toolbar */}
            <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                {/* Status Filter Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none text-xs">
                    {[
                        { id: "all", label: "All Orders" },
                        { id: "pending", label: "🟡 New" },
                        { id: "in_kitchen", label: "👨‍🍳 Cooking" },
                        { id: "ready", label: "🟢 Ready" },
                        { id: "completed", label: "✅ Done" },
                        { id: "cancelled", label: "❌ Cancelled" },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => setStatusFilter(tab.id)}
                            className={`px-3 py-1.5 rounded-xl font-bold transition whitespace-nowrap cursor-pointer ${
                                statusFilter === tab.id
                                    ? "bg-slate-900 text-white shadow-xs"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Search & Source filter */}
                <div className="flex items-center gap-2">
                    <select
                        value={sourceFilter}
                        onChange={(e) => setSourceFilter(e.target.value)}
                        className="bg-gray-50 border border-gray-200 text-xs font-bold text-gray-700 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 cursor-pointer"
                    >
                        <option value="all">All Channels</option>
                        <option value="pos">🏪 POS Register Only</option>
                        <option value="online">🌐 Online Store Only</option>
                    </select>

                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search ID, customer..."
                        className="bg-gray-50 border border-gray-200 text-xs rounded-xl px-3 py-2 w-44 sm:w-52 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                </div>
            </div>

            {/* Orders Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredOrders.length === 0 ? (
                    <div className="col-span-full bg-white rounded-3xl p-12 text-center border border-dashed border-gray-300">
                        <div className="text-4xl mb-2">📋</div>
                        <h3 className="text-base font-bold text-gray-900">No Orders in this View</h3>
                        <p className="text-xs text-gray-500 mt-1">Try switching status filters or place a new order.</p>
                    </div>
                ) : (
                    filteredOrders.map((order) => (
                        <div
                            key={order.orderId}
                            className="bg-white rounded-3xl border border-gray-200 p-5 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition"
                        >
                            {/* Order Card Header */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono font-black text-sm text-gray-900">
                                            {order.orderId}
                                        </span>
                                        <span
                                            className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md border ${
                                                order.source === "online"
                                                    ? "bg-purple-50 text-purple-700 border-purple-200"
                                                    : "bg-blue-50 text-blue-700 border-blue-200"
                                            }`}
                                        >
                                            {order.source === "online" ? "🌐 Online" : "🏪 POS"}
                                        </span>
                                    </div>
                                    <span className="text-xs text-gray-400 font-semibold">
                                        🕒 {order.placedAt}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between text-xs">
                                    <span className="font-bold text-gray-800">
                                        {order.customerName}
                                    </span>
                                    <span
                                        className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border ${getStatusBadge(
                                            order.status
                                        )}`}
                                    >
                                        {getStatusLabel(order.status)}
                                    </span>
                                </div>

                                <div className="text-[11px] text-gray-500 flex items-center justify-between">
                                    <span>📍 {order.address}</span>
                                    {order.phone && order.phone !== "N/A" && <span>📞 {order.phone}</span>}
                                </div>

                                {order.notes && (
                                    <div className="text-[10px] bg-amber-50 text-amber-900 p-2 rounded-xl border border-amber-200 font-medium">
                                        💬 Note: {order.notes}
                                    </div>
                                )}
                            </div>

                            {/* Itemized summary */}
                            <div className="bg-gray-50 rounded-2xl p-3 border border-gray-100 space-y-1.5 text-xs">
                                {order.items?.map((it, idx) => (
                                    <div key={idx} className="flex justify-between items-center">
                                        <div>
                                            <span className="font-bold text-gray-800">
                                                {it.quantity}x {it.title}
                                            </span>
                                            {it.drink && (
                                                <span className="text-[10px] text-gray-500 ml-1.5">
                                                    ({it.drink})
                                                </span>
                                            )}
                                        </div>
                                        <span className="font-semibold text-gray-700">
                                            Rs. {(it.price * it.quantity).toLocaleString()}
                                        </span>
                                    </div>
                                ))}
                                <div className="pt-2 border-t border-gray-200 flex justify-between items-center font-black text-gray-900">
                                    <span>Total:</span>
                                    <span>Rs. {order.totalAmount.toLocaleString()}</span>
                                </div>
                            </div>

                            {/* Actions Toolbar */}
                            <div className="pt-1 flex items-center gap-2">
                                {order.status !== "completed" && order.status !== "cancelled" && (
                                    <button
                                        type="button"
                                        onClick={() => handleAdvanceStatus(order)}
                                        className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2.5 rounded-xl shadow-xs transition active:scale-95 cursor-pointer"
                                    >
                                        {order.status === "pending" && "👨‍🍳 Send to Kitchen"}
                                        {order.status === "in_kitchen" && "🟢 Mark Ready"}
                                        {order.status === "ready" && "✅ Complete Order"}
                                    </button>
                                )}

                                <button
                                    type="button"
                                    onClick={() => handlePrintReceipt(order)}
                                    title="View & Print Thermal Receipt"
                                    className="bg-orange-50 hover:bg-orange-100 text-orange-600 border border-orange-200 p-2.5 rounded-xl font-bold text-xs transition cursor-pointer"
                                >
                                    🧾 Receipt
                                </button>

                                {order.status !== "cancelled" && order.status !== "completed" && (
                                    <button
                                        type="button"
                                        onClick={() => cancelOrder(order.orderId)}
                                        title="Cancel Order"
                                        className="text-red-400 hover:text-red-600 p-2.5 rounded-xl hover:bg-red-50 transition cursor-pointer"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Thermal Receipt Modal */}
            <ThermalReceiptModal
                isOpen={isReceiptOpen}
                order={selectedReceiptOrder}
                onClose={() => setIsReceiptOpen(false)}
            />
        </div>
    );
}
