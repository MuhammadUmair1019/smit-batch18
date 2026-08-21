export default function OrderSummary({
    totalCartPrice,
    couponCode,
    setCouponCode,
    appliedDiscount,
    couponError,
    onApplyCoupon,
    onRemoveCoupon,
    discountAmount,
    isFreeDeliveryQualified,
    standardDeliveryFee,
    taxAmount,
    finalTotal,
    onOpenCheckout,
}) {
    return (
        <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-7 shadow-xs space-y-6 sticky top-28">
            <h2 className="text-xl font-black text-gray-900 pb-4 border-b border-gray-100">
                Order Summary
            </h2>

            {/* Coupon input form */}
            <form onSubmit={onApplyCoupon} className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                    Promo / Voucher Code
                </label>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Enter FLAME20"
                        className="bg-gray-50 uppercase border border-gray-200 rounded-xl px-3.5 py-2 text-sm font-bold flex-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                    <button
                        type="submit"
                        className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2 rounded-xl transition cursor-pointer"
                    >
                        Apply
                    </button>
                </div>

                {appliedDiscount && (
                    <div className="flex items-center justify-between text-xs bg-emerald-50 text-emerald-800 p-2.5 rounded-xl border border-emerald-200">
                        <span className="font-bold">✓ {appliedDiscount.description}</span>
                        <button
                            type="button"
                            onClick={onRemoveCoupon}
                            className="text-emerald-700 hover:text-red-600 font-bold ml-2 underline cursor-pointer"
                        >
                            Remove
                        </button>
                    </div>
                )}

                {couponError && (
                    <p className="text-xs text-red-500 font-semibold">{couponError}</p>
                )}
            </form>

            {/* Breakdown lines */}
            <div className="space-y-3 text-sm text-gray-600 pt-2 border-t border-gray-100">
                <div className="flex justify-between">
                    <span>Cart Subtotal</span>
                    <span className="font-bold text-gray-900">
                        Rs. {totalCartPrice.toLocaleString()}
                    </span>
                </div>

                {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-bold">
                        <span>Voucher Discount</span>
                        <span>- Rs. {discountAmount.toLocaleString()}</span>
                    </div>
                )}

                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1.5">
                        <span>Delivery Fee</span>
                        {isFreeDeliveryQualified && (
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-md font-bold">
                                FREE
                            </span>
                        )}
                    </div>
                    <span className="font-bold text-gray-900">
                        {standardDeliveryFee === 0 ? "Free" : `Rs. ${standardDeliveryFee}`}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span>GST / Sales Tax (5%)</span>
                    <span className="font-bold text-gray-900">
                        Rs. {taxAmount.toLocaleString()}
                    </span>
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-between items-end">
                    <div>
                        <div className="text-xs uppercase font-bold text-gray-500">
                            Total Amount
                        </div>
                        <div className="text-2xl sm:text-3xl font-black text-gray-900">
                            Rs. {finalTotal.toLocaleString()}
                        </div>
                    </div>
                    <div className="text-[11px] text-gray-400 text-right">
                        Includes all taxes
                    </div>
                </div>
            </div>

            {/* Checkout CTA */}
            <button
                onClick={onOpenCheckout}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-base py-4 rounded-2xl shadow-xl shadow-orange-500/25 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
                <span>Proceed to Checkout</span>
                <span>&rarr;</span>
            </button>
        </div>
    );
}
