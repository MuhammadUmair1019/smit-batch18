export default function CheckoutModal({
    isOpen,
    onClose,
    onSubmit,
    fullName,
    setFullName,
    phone,
    setPhone,
    address,
    setAddress,
    notes,
    setNotes,
    paymentMethod,
    setPaymentMethod,
    finalTotal,
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto space-y-6">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <div>
                        <h2 className="text-2xl font-black text-gray-900">
                            Delivery Details
                        </h2>
                        <p className="text-xs text-gray-500">
                            Where should we deliver your hot meal?
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center font-bold cursor-pointer"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                            Full Name <span className="text-orange-500">*</span>
                        </label>
                        <input
                            type="text"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="e.g. Ali Arshad"
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                            Phone Number (WhatsApp / Mobile) <span className="text-orange-500">*</span>
                        </label>
                        <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="e.g. 0300-1234567"
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                            Delivery Address <span className="text-orange-500">*</span>
                        </label>
                        <textarea
                            required
                            rows="2"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Street address, House #, Building name, Area..."
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                            Special Instructions (Optional)
                        </label>
                        <input
                            type="text"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="e.g. Extra spicy, don't ring the bell"
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    </div>

                    {/* Payment selection */}
                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-2">
                            Payment Method
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            <label
                                className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer ${
                                    paymentMethod === "cod"
                                        ? "border-orange-500 bg-orange-50 text-orange-950 font-bold"
                                        : "border-gray-200 text-gray-700"
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="payment"
                                    value="cod"
                                    checked={paymentMethod === "cod"}
                                    onChange={() => setPaymentMethod("cod")}
                                    className="accent-orange-500"
                                />
                                <span className="text-xs">💵 Cash on Delivery</span>
                            </label>

                            <label
                                className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer ${
                                    paymentMethod === "card"
                                        ? "border-orange-500 bg-orange-50 text-orange-950 font-bold"
                                        : "border-gray-200 text-gray-700"
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="payment"
                                    value="card"
                                    checked={paymentMethod === "card"}
                                    onChange={() => setPaymentMethod("card")}
                                    className="accent-orange-500"
                                />
                                <span className="text-xs">💳 Card on Delivery</span>
                            </label>
                        </div>
                    </div>

                    {/* Order Total Review */}
                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex items-center justify-between text-sm">
                        <div>
                            <span className="text-xs text-gray-500 font-bold block">Grand Total:</span>
                            <span className="text-xl font-black text-gray-900">
                                Rs. {finalTotal.toLocaleString()}
                            </span>
                        </div>
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                            Estimated: 25-35 min
                        </span>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-base py-4 rounded-2xl shadow-xl shadow-orange-500/25 active:scale-95 transition-all cursor-pointer"
                    >
                        Confirm & Place Order
                    </button>
                </form>
            </div>
        </div>
    );
}
