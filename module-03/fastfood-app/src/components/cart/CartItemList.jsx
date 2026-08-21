import CartItemCard from "./CartItemCard";

export default function CartItemList({
    items,
    onUpdateQuantity,
    onRemove,
    onSelectCoupon,
}) {
    return (
        <div className="space-y-4">
            <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-xs divide-y divide-gray-100">
                {items.map((item, index) => (
                    <CartItemCard
                        key={`${item.id}-${item.drink}-${index}`}
                        item={item}
                        onUpdateQuantity={onUpdateQuantity}
                        onRemove={onRemove}
                    />
                ))}
            </div>

            {/* Available coupon pills */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 pt-2">
                <span className="font-bold">Available Coupons:</span>
                <button
                    onClick={() => onSelectCoupon("FLAME20")}
                    className="bg-orange-50 text-orange-700 font-bold px-2.5 py-1 rounded-lg border border-orange-200 hover:bg-orange-100 cursor-pointer"
                >
                    FLAME20 (20% OFF)
                </button>
                <button
                    onClick={() => onSelectCoupon("FREEDEL")}
                    className="bg-amber-50 text-amber-700 font-bold px-2.5 py-1 rounded-lg border border-amber-200 hover:bg-amber-100 cursor-pointer"
                >
                    FREEDEL (Free Delivery)
                </button>
                <button
                    onClick={() => onSelectCoupon("BITE100")}
                    className="bg-rose-50 text-rose-700 font-bold px-2.5 py-1 rounded-lg border border-rose-200 hover:bg-rose-100 cursor-pointer"
                >
                    BITE100 (Rs. 100 OFF)
                </button>
            </div>
        </div>
    );
}
