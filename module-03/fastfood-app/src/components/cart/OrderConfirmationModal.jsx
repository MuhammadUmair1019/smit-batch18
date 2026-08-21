import { Link } from "react-router-dom";

export default function OrderConfirmationModal({
    isOpen,
    orderDetails,
    onClose,
}) {
    if (!isOpen || !orderDetails) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl text-center space-y-6">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-4xl shadow-inner animate-bounce">
                    🎉
                </div>

                <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                        Order Placed Successfully!
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-3">
                        Thank You, {orderDetails.customerName}!
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        Your order <span className="font-mono font-bold text-gray-900">{orderDetails.orderId}</span> is being freshly prepared in the kitchen.
                    </p>
                </div>

                <div className="bg-orange-50/70 p-4 rounded-2xl border border-orange-100 text-left text-xs space-y-2">
                    <div className="flex justify-between">
                        <span className="text-gray-500">Estimated Delivery:</span>
                        <span className="font-bold text-orange-600">{orderDetails.deliveryEstimate}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Deliver To:</span>
                        <span className="font-bold text-gray-900 truncate max-w-[200px]">{orderDetails.address}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Contact:</span>
                        <span className="font-bold text-gray-900">{orderDetails.phone}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-orange-200">
                        <span className="text-gray-900 font-bold">Total Amount to Pay:</span>
                        <span className="font-black text-gray-900 text-sm">
                            Rs. {orderDetails.totalAmount.toLocaleString()} ({orderDetails.paymentMethod === "cod" ? "Cash" : "Card"})
                        </span>
                    </div>
                </div>

                <Link
                    to="/collection"
                    onClick={onClose}
                    className="block w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm py-3.5 rounded-xl shadow-md transition cursor-pointer"
                >
                    Order More Food &rarr;
                </Link>
            </div>
        </div>
    );
}
