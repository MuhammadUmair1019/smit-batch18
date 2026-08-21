import { useCart } from "../../contextapi/CartContext";

export default function DealsSection() {
    const { showToast } = useCart();

    const handleCopyCode = (code) => {
        navigator.clipboard?.writeText(code);
        showToast(`Promo code "${code}" copied to clipboard! Paste in cart to claim discount.`, "success");
    };

    return (
        <section id="deals" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
                <span className="text-xs font-black uppercase tracking-widest text-red-600 bg-red-50 px-3 py-1 rounded-full">
                    Exclusive Vouchers & Combos
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-3">
                    Today's Sizzling Deals
                </h2>
                <p className="text-sm text-gray-600 mt-2">
                    Use these coupon codes at checkout to unlock instant discounts and bonus perks!
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Deal 1 */}
                <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden flex flex-col justify-between">
                    <div className="space-y-3">
                        <span className="bg-white/20 backdrop-blur-md text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                            20% Off Entire Order
                        </span>
                        <h3 className="text-2xl font-black">Weekend Feast Offer</h3>
                        <p className="text-xs text-orange-100 leading-relaxed">
                            Get a flat 20% discount on any cart subtotal above Rs. 1,000. Valid on all burgers & pizzas!
                        </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-white/20 flex items-center justify-between">
                        <div>
                            <span className="text-[10px] uppercase font-bold text-orange-200 block">Promo Code</span>
                            <span className="font-mono font-black text-lg">FLAME20</span>
                        </div>
                        <button
                            onClick={() => handleCopyCode("FLAME20")}
                            className="bg-white text-orange-600 hover:bg-orange-50 font-bold text-xs px-4 py-2 rounded-xl shadow-md transition active:scale-95 cursor-pointer"
                        >
                            Copy Code
                        </button>
                    </div>
                </div>

                {/* Deal 2 */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden flex flex-col justify-between border border-slate-700">
                    <div className="space-y-3">
                        <span className="bg-orange-500 text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                            Free Fast Delivery
                        </span>
                        <h3 className="text-2xl font-black">Zero Delivery Fee</h3>
                        <p className="text-xs text-gray-300 leading-relaxed">
                            Enjoy free 30-minute doorstep delivery on all orders with code FREEDEL!
                        </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-700 flex items-center justify-between">
                        <div>
                            <span className="text-[10px] uppercase font-bold text-gray-400 block">Promo Code</span>
                            <span className="font-mono font-black text-lg text-amber-400">FREEDEL</span>
                        </div>
                        <button
                            onClick={() => handleCopyCode("FREEDEL")}
                            className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-md transition active:scale-95 cursor-pointer"
                        >
                            Copy Code
                        </button>
                    </div>
                </div>

                {/* Deal 3 */}
                <div className="bg-gradient-to-br from-red-600 to-rose-700 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden flex flex-col justify-between">
                    <div className="space-y-3">
                        <span className="bg-white/20 backdrop-blur-md text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                            Flat Rs. 100 Off
                        </span>
                        <h3 className="text-2xl font-black">Shawarma & Bites Pack</h3>
                        <p className="text-xs text-rose-100 leading-relaxed">
                            Save Rs. 100 instantly on your next shawarma or burger combo using code BITE100.
                        </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-white/20 flex items-center justify-between">
                        <div>
                            <span className="text-[10px] uppercase font-bold text-rose-200 block">Promo Code</span>
                            <span className="font-mono font-black text-lg">BITE100</span>
                        </div>
                        <button
                            onClick={() => handleCopyCode("BITE100")}
                            className="bg-white text-red-600 hover:bg-rose-50 font-bold text-xs px-4 py-2 rounded-xl shadow-md transition active:scale-95 cursor-pointer"
                        >
                            Copy Code
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
