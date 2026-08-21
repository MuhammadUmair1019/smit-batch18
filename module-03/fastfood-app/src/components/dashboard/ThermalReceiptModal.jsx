export default function ThermalReceiptModal({ isOpen, order, onClose }) {
    if (!isOpen || !order) return null;

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-6 max-h-[95vh] overflow-y-auto">
                {/* Header Action */}
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                        Thermal Receipt Preview
                    </span>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center font-bold cursor-pointer"
                    >
                        ✕
                    </button>
                </div>

                {/* Printable 80mm Thermal Receipt Content */}
                <div
                    id="printable-receipt"
                    className="bg-stone-50 border border-gray-300 p-5 rounded-2xl font-mono text-xs text-gray-900 space-y-3 shadow-inner"
                >
                    {/* Header */}
                    <div className="text-center space-y-1">
                        <div className="text-xl font-black tracking-widest uppercase">
                            🔥 FLAMEBITE 🔥
                        </div>
                        <div className="text-[10px] text-gray-600">
                            Fast • Fresh • Sizzling
                        </div>
                        <div className="text-[10px] text-gray-600">
                            Food Street, Phase 5, DHA, Lahore
                        </div>
                        <div className="text-[10px] text-gray-600">
                            Phone: +92 300 1234567 | NTN: 8492041-3
                        </div>
                    </div>

                    <div className="border-t border-dashed border-gray-400 my-2"></div>

                    {/* Metadata */}
                    <div className="space-y-1 text-[11px]">
                        <div className="flex justify-between">
                            <span>Receipt #:</span>
                            <span className="font-bold">{order.orderId}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Date & Time:</span>
                            <span>{order.placedAt || "Today"}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Order Type:</span>
                            <span className="font-bold uppercase">
                                {order.orderType} {order.tableNo ? `(T-${order.tableNo})` : ""}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span>Customer:</span>
                            <span className="truncate max-w-[140px]">{order.customerName}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Cashier:</span>
                            <span>POS Terminal #1</span>
                        </div>
                    </div>

                    <div className="border-t border-dashed border-gray-400 my-2"></div>

                    {/* Itemized Table */}
                    <table className="w-full text-left text-[11px]">
                        <thead>
                            <tr className="border-b border-gray-400">
                                <th className="py-1">Item</th>
                                <th className="text-center py-1">Qty</th>
                                <th className="text-right py-1">Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {order.items?.map((item, idx) => (
                                <tr key={idx}>
                                    <td className="py-1.5">
                                        <div className="font-bold leading-tight">{item.title}</div>
                                        {item.drink && (
                                            <div className="text-[9px] text-gray-500">
                                                +{item.drink}
                                            </div>
                                        )}
                                    </td>
                                    <td className="text-center py-1.5 align-top font-bold">
                                        {item.quantity}
                                    </td>
                                    <td className="text-right py-1.5 align-top font-bold">
                                        Rs. {(item.price * item.quantity).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="border-t border-dashed border-gray-400 my-2"></div>

                    {/* Totals Breakdown */}
                    <div className="space-y-1 text-[11px]">
                        <div className="flex justify-between">
                            <span>Subtotal:</span>
                            <span>Rs. {(order.subtotal || order.totalAmount).toLocaleString()}</span>
                        </div>
                        {order.discount > 0 && (
                            <div className="flex justify-between text-gray-700">
                                <span>Discount:</span>
                                <span>- Rs. {order.discount.toLocaleString()}</span>
                            </div>
                        )}
                        <div className="flex justify-between">
                            <span>Tax (5% GST):</span>
                            <span>Rs. {(order.tax || 0).toLocaleString()}</span>
                        </div>
                        {order.deliveryFee > 0 && (
                            <div className="flex justify-between">
                                <span>Delivery Fee:</span>
                                <span>Rs. {order.deliveryFee.toLocaleString()}</span>
                            </div>
                        )}
                        <div className="flex justify-between text-sm font-black pt-1 border-t border-gray-400">
                            <span>NET TOTAL:</span>
                            <span>Rs. {order.totalAmount.toLocaleString()}</span>
                        </div>
                    </div>

                    <div className="border-t border-dashed border-gray-400 my-2"></div>

                    {/* Payment Info */}
                    <div className="space-y-1 text-[11px]">
                        <div className="flex justify-between">
                            <span>Payment Mode:</span>
                            <span className="uppercase font-bold">{order.paymentMethod || "Cash"}</span>
                        </div>
                        {order.cashTendered > 0 && (
                            <>
                                <div className="flex justify-between">
                                    <span>Cash Tendered:</span>
                                    <span>Rs. {order.cashTendered.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between font-bold">
                                    <span>Change Returned:</span>
                                    <span>Rs. {(order.changeDue || 0).toLocaleString()}</span>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="border-t border-dashed border-gray-400 my-3"></div>

                    {/* Barcode & Footer */}
                    <div className="text-center space-y-2">
                        <div className="tracking-[4px] font-black text-xs">
                            ||| | ||||| || |||| ||| ||||
                        </div>
                        <div className="text-[9px] text-gray-500">
                            {order.orderId}
                        </div>
                        <div className="text-[10px] font-bold">
                            THANK YOU FOR DINING WITH US!
                        </div>
                        <div className="text-[9px] text-gray-500">
                            WiFi: FlameBite_Guest / Pass: burger123
                        </div>
                    </div>
                </div>

                {/* Print Action Buttons */}
                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={handlePrint}
                        className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm py-3.5 rounded-xl shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 cursor-pointer"
                    >
                        <span>🖨️ Print Receipt</span>
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-sm px-5 py-3.5 rounded-xl transition cursor-pointer"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
