export default function CartItemCard({ item, onUpdateQuantity, onRemove }) {
    return (
        <div className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-orange-50/20 transition">
            {/* Thumbnail & Title */}
            <div className="flex items-center gap-4 flex-1">
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-2xl bg-gray-100 border border-gray-100 shrink-0"
                />
                <div className="space-y-1">
                    <h3 className="font-bold text-gray-900 text-base sm:text-lg">
                        {item.title}
                    </h3>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-100 text-orange-800">
                        <span>🥤 Drink:</span>
                        <span>{item.drink}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                        Unit Price: Rs. {item.price.toLocaleString()}
                    </div>
                </div>
            </div>

            {/* Controls: Stepper, Subtotal, Remove */}
            <div className="flex items-center justify-between w-full sm:w-auto sm:gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                {/* Stepper */}
                <div className="flex items-center bg-gray-100 rounded-xl p-1 border border-gray-200">
                    <button
                        onClick={() => onUpdateQuantity(item, item.quantity - 1)}
                        className="w-8 h-8 rounded-lg bg-white hover:bg-gray-200 font-bold text-gray-800 flex items-center justify-center transition shadow-2xs cursor-pointer"
                    >
                        -
                    </button>
                    <span className="w-9 text-center font-bold text-sm text-gray-900">
                        {item.quantity}
                    </span>
                    <button
                        onClick={() => onUpdateQuantity(item, item.quantity + 1)}
                        className="w-8 h-8 rounded-lg bg-white hover:bg-gray-200 font-bold text-gray-800 flex items-center justify-center transition shadow-2xs cursor-pointer"
                    >
                        +
                    </button>
                </div>

                {/* Item Total */}
                <div className="text-right min-w-[90px]">
                    <div className="text-base font-black text-gray-900">
                        Rs. {(item.price * item.quantity).toLocaleString()}
                    </div>
                </div>

                {/* Remove Button */}
                <button
                    onClick={() => onRemove(item)}
                    title="Remove item"
                    className="text-gray-400 hover:text-red-500 p-2 rounded-xl hover:bg-red-50 transition cursor-pointer"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
