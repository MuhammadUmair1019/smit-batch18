import { useState, useMemo } from "react";
import { useRestaurant } from "../../contextapi/RestaurantContext";
import { useCart } from "../../contextapi/CartContext";
import ThermalReceiptModal from "../../components/dashboard/ThermalReceiptModal";

const drinksList = [
    { id: 101, name: "Coca Cola", icon: "🥤" },
    { id: 102, name: "Pepsi", icon: "🥤" },
    { id: 103, name: "Sprite", icon: "🍋" },
    { id: 104, name: "Orange Juice", icon: "🍊" },
    { id: 105, name: "Mineral Water", icon: "💧" },
];

export default function PosTerminal() {
    const { menuItems, createOrder } = useRestaurant();
    const { showToast } = useCart();

    // Filter states
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    // POS Ticket State
    const [ticketItems, setTicketItems] = useState([]);
    const [orderType, setOrderType] = useState("dine-in"); // 'dine-in', 'takeaway', 'delivery'
    const [tableNo, setTableNo] = useState("1");
    const [customerName, setCustomerName] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [notes, setNotes] = useState("");
    const [discountAmount, setDiscountAmount] = useState(0);

    // Payment state
    const [paymentMethod, setPaymentMethod] = useState("cash"); // 'cash', 'card', 'qr'
    const [cashTendered, setCashTendered] = useState("");
    const [selectedDrinkForAdd, setSelectedDrinkForAdd] = useState(drinksList[0]);

    // Receipt Modal State
    const [receiptOrder, setReceiptOrder] = useState(null);
    const [isReceiptOpen, setIsReceiptOpen] = useState(false);

    // Filter products
    const filteredProducts = useMemo(() => {
        return menuItems.filter((item) => {
            const matchesCategory =
                selectedCategory === "All" || item.category.toLowerCase() === selectedCategory.toLowerCase();
            const matchesSearch =
                item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.category.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [menuItems, selectedCategory, searchQuery]);

    // Add item to POS ticket
    const handleAddItem = (product) => {
        setTicketItems((prev) => {
            const drinkName = selectedDrinkForAdd.name;
            const existingIndex = prev.findIndex(
                (item) => item.id === product.id && item.drink === drinkName
            );

            if (existingIndex > -1) {
                const copy = [...prev];
                copy[existingIndex].quantity += 1;
                return copy;
            } else {
                return [
                    ...prev,
                    {
                        id: product.id,
                        title: product.title,
                        price: product.price,
                        image: product.image,
                        drink: drinkName,
                        quantity: 1,
                    },
                ];
            }
        });
    };

    const handleUpdateQuantity = (index, newQty) => {
        if (newQty <= 0) {
            setTicketItems((prev) => prev.filter((_, idx) => idx !== index));
        } else {
            setTicketItems((prev) =>
                prev.map((item, idx) => (idx === index ? { ...item, quantity: newQty } : item))
            );
        }
    };

    const handleClearTicket = () => {
        setTicketItems([]);
        setCashTendered("");
        setDiscountAmount(0);
        setNotes("");
    };

    // Calculate totals
    const subtotal = ticketItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const taxRate = 0.05;
    const tax = Math.round(subtotal * taxRate);
    const totalAmount = Math.max(0, subtotal - discountAmount + tax);

    const numericCashTendered = parseFloat(cashTendered) || 0;
    const changeDue = numericCashTendered > totalAmount ? numericCashTendered - totalAmount : 0;

    // Fast quick cash adder
    const handleQuickCash = (amount) => {
        setCashTendered((prev) => {
            const current = parseFloat(prev) || 0;
            return (current + amount).toString();
        });
    };

    const handleSetExactCash = () => {
        setCashTendered(totalAmount.toString());
    };

    // Complete POS Sale
    const handleChargeOrder = (e) => {
        e?.preventDefault();

        if (ticketItems.length === 0) {
            showToast("Cannot charge an empty ticket. Add items first!", "info");
            return;
        }

        if (paymentMethod === "cash" && numericCashTendered > 0 && numericCashTendered < totalAmount) {
            showToast("Tendered cash is less than the total bill amount!", "info");
            return;
        }

        const newOrder = createOrder({
            customerName:
                customerName.trim() ||
                (orderType === "dine-in" ? `Table ${tableNo} Guest` : "Walk-in Customer"),
            phone: customerPhone.trim() || "N/A",
            address:
                orderType === "dine-in"
                    ? `Table #${tableNo}`
                    : orderType === "takeaway"
                    ? "Counter Pickup"
                    : "Delivery",
            orderType,
            tableNo: orderType === "dine-in" ? tableNo : null,
            source: "pos",
            status: "in_kitchen",
            paymentMethod,
            paymentStatus: "paid",
            notes,
            items: [...ticketItems],
            subtotal,
            discount: discountAmount,
            tax,
            deliveryFee: 0,
            totalAmount,
            cashTendered: paymentMethod === "cash" ? numericCashTendered || totalAmount : totalAmount,
            changeDue: paymentMethod === "cash" ? changeDue : 0,
        });

        setReceiptOrder(newOrder);
        setIsReceiptOpen(true);
        handleClearTicket();
        showToast(`Order ${newOrder.orderId} placed & sent to kitchen!`, "success");
    };

    return (
        <div className="min-h-screen bg-slate-900 text-gray-100 flex flex-col">
            {/* POS Top Header Bar */}
            <header className="bg-slate-950 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-xl font-bold shadow-md">
                        🔥
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-base font-black tracking-tight text-white">
                                FlameBite <span className="text-orange-500">POS</span>
                            </h1>
                            <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded-full font-bold">
                                Terminal #1 • Online
                            </span>
                        </div>
                        <p className="text-[10px] text-gray-400">Cashier: Station 01</p>
                    </div>
                </div>

                {/* Default Paired Drink Selector for fast taps */}
                <div className="hidden sm:flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
                    <span className="text-gray-400 font-bold">Tap Default Drink:</span>
                    <select
                        value={selectedDrinkForAdd.id}
                        onChange={(e) => {
                            const d = drinksList.find((drink) => drink.id === Number(e.target.value));
                            if (d) setSelectedDrinkForAdd(d);
                        }}
                        className="bg-slate-800 text-white font-bold rounded-lg px-2 py-1 border border-slate-700 focus:outline-none cursor-pointer"
                    >
                        {drinksList.map((d) => (
                            <option key={d.id} value={d.id}>
                                {d.icon} {d.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                        <div className="text-xs font-bold text-white">
                            {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </div>
                        <div className="text-[10px] text-gray-400">
                            {new Date().toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" })}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main POS Interface (Split Left: Catalog / Right: Ticket) */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
                {/* LEFT: PRODUCTS CATALOG (8 COLS) */}
                <div className="lg:col-span-7 xl:col-span-8 p-4 sm:p-6 flex flex-col space-y-4 overflow-y-auto max-h-[calc(100vh-65px)]">
                    {/* Category Tabs & Search Bar */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                            {["All", "Burger", "Shawarma", "Pizza"].map((category) => {
                                const isActive = selectedCategory === category;
                                return (
                                    <button
                                        key={category}
                                        type="button"
                                        onClick={() => setSelectedCategory(category)}
                                        className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                                            isActive
                                                ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                                                : "bg-slate-800 text-gray-300 hover:bg-slate-700"
                                        }`}
                                    >
                                        {category}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Fast search dish..."
                                className="bg-slate-800 border border-slate-700 text-white text-xs rounded-xl pl-8 pr-4 py-2 w-full sm:w-56 focus:outline-none focus:border-orange-500 placeholder-gray-500"
                            />
                            <span className="absolute left-2.5 top-2 text-gray-500 text-xs">🔍</span>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 pt-1">
                        {filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                onClick={() => handleAddItem(product)}
                                className="bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:border-orange-500 rounded-2xl p-3 flex flex-col justify-between cursor-pointer transition-all hover:scale-102 active:scale-98 shadow-md group select-none"
                            >
                                <div className="relative h-24 sm:h-28 rounded-xl overflow-hidden mb-2 bg-slate-900">
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                    />
                                    <span className="absolute top-1.5 left-1.5 bg-black/70 backdrop-blur-xs text-[10px] font-bold px-2 py-0.5 rounded-md text-white">
                                        {product.category}
                                    </span>
                                </div>

                                <div className="space-y-1">
                                    <h3 className="text-xs font-bold text-white line-clamp-1 group-hover:text-orange-400 transition-colors">
                                        {product.title}
                                    </h3>
                                    <div className="flex items-center justify-between pt-1">
                                        <span className="text-sm font-black text-orange-400">
                                            Rs. {product.price}
                                        </span>
                                        <span className="w-6 h-6 rounded-lg bg-orange-500/20 text-orange-400 group-hover:bg-orange-500 group-hover:text-white flex items-center justify-center font-bold text-xs transition">
                                            +
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT: POS TICKET & BILLING (4-5 COLS) */}
                <div className="lg:col-span-5 xl:col-span-4 bg-slate-950 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col justify-between max-h-[calc(100vh-65px)] overflow-y-auto">
                    {/* Ticket Header & Order Type */}
                    <div className="p-4 border-b border-slate-800 space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-black uppercase tracking-wider text-gray-400">
                                Current Register Ticket
                            </span>
                            {ticketItems.length > 0 && (
                                <button
                                    onClick={handleClearTicket}
                                    className="text-[11px] text-red-400 hover:text-red-300 font-bold hover:underline cursor-pointer"
                                >
                                    Clear Ticket
                                </button>
                            )}
                        </div>

                        {/* Order Type Tabs */}
                        <div className="grid grid-cols-3 gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
                            <button
                                type="button"
                                onClick={() => setOrderType("dine-in")}
                                className={`py-1.5 rounded-lg font-bold transition cursor-pointer ${
                                    orderType === "dine-in"
                                        ? "bg-orange-500 text-white shadow-xs"
                                        : "text-gray-400 hover:text-white"
                                }`}
                            >
                                🍽️ Dine-in
                            </button>
                            <button
                                type="button"
                                onClick={() => setOrderType("takeaway")}
                                className={`py-1.5 rounded-lg font-bold transition cursor-pointer ${
                                    orderType === "takeaway"
                                        ? "bg-orange-500 text-white shadow-xs"
                                        : "text-gray-400 hover:text-white"
                                }`}
                            >
                                🥡 Takeaway
                            </button>
                            <button
                                type="button"
                                onClick={() => setOrderType("delivery")}
                                className={`py-1.5 rounded-lg font-bold transition cursor-pointer ${
                                    orderType === "delivery"
                                        ? "bg-orange-500 text-white shadow-xs"
                                        : "text-gray-400 hover:text-white"
                                }`}
                            >
                                🛵 Delivery
                            </button>
                        </div>

                        {/* Dynamic Field: Table # or Customer Name */}
                        {orderType === "dine-in" ? (
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-400 font-bold">Select Table:</span>
                                <div className="flex gap-1 overflow-x-auto">
                                    {["1", "2", "3", "4", "5", "6", "7", "8"].map((t) => (
                                        <button
                                            key={t}
                                            type="button"
                                            onClick={() => setTableNo(t)}
                                            className={`w-7 h-7 rounded-lg text-xs font-black transition cursor-pointer ${
                                                tableNo === t
                                                    ? "bg-amber-400 text-slate-950"
                                                    : "bg-slate-800 text-gray-300 hover:bg-slate-700"
                                            }`}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-2 text-xs">
                                <input
                                    type="text"
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                    placeholder="Customer Name"
                                    className="bg-slate-900 border border-slate-800 text-white px-2.5 py-1.5 rounded-lg focus:outline-none focus:border-orange-500"
                                />
                                <input
                                    type="tel"
                                    value={customerPhone}
                                    onChange={(e) => setCustomerPhone(e.target.value)}
                                    placeholder="Phone (Optional)"
                                    className="bg-slate-900 border border-slate-800 text-white px-2.5 py-1.5 rounded-lg focus:outline-none focus:border-orange-500"
                                />
                            </div>
                        )}
                    </div>

                    {/* Ticket Items List */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-2 max-h-64 divide-y divide-slate-800/60">
                        {ticketItems.length === 0 ? (
                            <div className="text-center py-10 text-gray-500 text-xs">
                                <div className="text-2xl mb-1">🧾</div>
                                <div>Ticket is empty</div>
                                <div className="text-[10px]">Tap dishes from the left to start order</div>
                            </div>
                        ) : (
                            ticketItems.map((item, index) => (
                                <div key={index} className="pt-2 flex items-center justify-between gap-2 text-xs">
                                    <div className="flex-1">
                                        <div className="font-bold text-white truncate max-w-[150px]">
                                            {item.title}
                                        </div>
                                        <div className="text-[10px] text-orange-400">
                                            +{item.drink}
                                        </div>
                                        <div className="text-[10px] text-gray-500">
                                            Rs. {item.price} each
                                        </div>
                                    </div>

                                    {/* Stepper */}
                                    <div className="flex items-center bg-slate-900 rounded-lg p-0.5 border border-slate-800">
                                        <button
                                            onClick={() => handleUpdateQuantity(index, item.quantity - 1)}
                                            className="w-6 h-6 rounded bg-slate-800 text-white font-bold flex items-center justify-center hover:bg-slate-700 cursor-pointer"
                                        >
                                            -
                                        </button>
                                        <span className="w-7 text-center font-bold text-white text-xs">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => handleUpdateQuantity(index, item.quantity + 1)}
                                            className="w-6 h-6 rounded bg-slate-800 text-white font-bold flex items-center justify-center hover:bg-slate-700 cursor-pointer"
                                        >
                                            +
                                        </button>
                                    </div>

                                    <div className="text-right min-w-[70px] font-black text-white">
                                        Rs. {(item.price * item.quantity).toLocaleString()}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Ticket Totals & Payment Section */}
                    <div className="p-4 bg-slate-900 border-t border-slate-800 space-y-3">
                        {/* Totals Summary */}
                        <div className="space-y-1.5 text-xs text-gray-400">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span className="font-bold text-white">Rs. {subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>GST (5%)</span>
                                <span className="font-bold text-white">Rs. {tax.toLocaleString()}</span>
                            </div>
                            {discountAmount > 0 && (
                                <div className="flex justify-between text-emerald-400">
                                    <span>Discount</span>
                                    <span>- Rs. {discountAmount}</span>
                                </div>
                            )}
                            <div className="flex justify-between items-center text-sm font-black text-white pt-1.5 border-t border-slate-800">
                                <span>Grand Total</span>
                                <span className="text-lg text-orange-400">
                                    Rs. {totalAmount.toLocaleString()}
                                </span>
                            </div>
                        </div>

                        {/* Payment Method Selector */}
                        <div className="grid grid-cols-3 gap-1.5 text-xs">
                            <button
                                type="button"
                                onClick={() => setPaymentMethod("cash")}
                                className={`py-2 rounded-xl font-bold border transition cursor-pointer ${
                                    paymentMethod === "cash"
                                        ? "bg-orange-500 border-orange-400 text-white"
                                        : "bg-slate-800 border-slate-700 text-gray-300 hover:bg-slate-700"
                                }`}
                            >
                                💵 Cash
                            </button>
                            <button
                                type="button"
                                onClick={() => setPaymentMethod("card")}
                                className={`py-2 rounded-xl font-bold border transition cursor-pointer ${
                                    paymentMethod === "card"
                                        ? "bg-orange-500 border-orange-400 text-white"
                                        : "bg-slate-800 border-slate-700 text-gray-300 hover:bg-slate-700"
                                }`}
                            >
                                💳 Card
                            </button>
                            <button
                                type="button"
                                onClick={() => setPaymentMethod("qr")}
                                className={`py-2 rounded-xl font-bold border transition cursor-pointer ${
                                    paymentMethod === "qr"
                                        ? "bg-orange-500 border-orange-400 text-white"
                                        : "bg-slate-800 border-slate-700 text-gray-300 hover:bg-slate-700"
                                }`}
                            >
                                📱 Digital QR
                            </button>
                        </div>

                        {/* Cash Tendered Calculator (when Cash selected) */}
                        {paymentMethod === "cash" && (
                            <div className="space-y-2 pt-1">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        value={cashTendered}
                                        onChange={(e) => setCashTendered(e.target.value)}
                                        placeholder="Cash Tendered (Rs.)"
                                        className="bg-slate-800 border border-slate-700 text-white text-xs font-bold px-3 py-2 rounded-xl flex-1 focus:outline-none focus:border-orange-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleSetExactCash}
                                        className="text-xs bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold px-2.5 py-2 rounded-xl border border-slate-700 cursor-pointer"
                                    >
                                        Exact
                                    </button>
                                </div>

                                {/* Quick Cash Buttons */}
                                <div className="flex gap-1.5">
                                    {[500, 1000, 2000, 5000].map((amt) => (
                                        <button
                                            key={amt}
                                            type="button"
                                            onClick={() => handleQuickCash(amt)}
                                            className="flex-1 bg-slate-800 hover:bg-slate-700 text-[10px] font-bold text-gray-300 py-1 rounded-lg border border-slate-700 cursor-pointer"
                                        >
                                            +{amt}
                                        </button>
                                    ))}
                                </div>

                                {numericCashTendered > 0 && (
                                    <div className="flex justify-between items-center bg-emerald-950/60 text-emerald-300 p-2 rounded-xl border border-emerald-800 text-xs">
                                        <span className="font-bold">Change to Return:</span>
                                        <span className="font-black text-sm">
                                            Rs. {changeDue.toLocaleString()}
                                        </span>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Charge Action Button */}
                        <button
                            type="button"
                            onClick={handleChargeOrder}
                            disabled={ticketItems.length === 0}
                            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black text-sm py-3.5 rounded-2xl shadow-lg shadow-orange-500/20 transition active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                        >
                            <span>⚡ Charge & Print Receipt (Rs. {totalAmount.toLocaleString()})</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Thermal Receipt Modal */}
            <ThermalReceiptModal
                isOpen={isReceiptOpen}
                order={receiptOrder}
                onClose={() => setIsReceiptOpen(false)}
            />
        </div>
    );
}
