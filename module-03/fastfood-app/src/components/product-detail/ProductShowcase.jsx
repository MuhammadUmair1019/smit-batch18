export default function ProductShowcase({ product }) {
    return (
        <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-3xl overflow-hidden bg-gray-100 aspect-4/3 border border-gray-100 shadow-inner group">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-xs font-black px-3.5 py-1.5 rounded-full shadow-md">
                    {product.category}
                </div>
                <div className="absolute top-4 right-4 bg-amber-400 text-slate-950 font-black text-xs px-3.5 py-1.5 rounded-full flex items-center gap-1 shadow-md">
                    <span>★</span>
                    <span>{product.rating.toFixed(1)}</span>
                </div>
            </div>

            {/* Quality Badges */}
            <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-orange-50/70 p-3 rounded-2xl border border-orange-100">
                    <span className="text-lg">🔥</span>
                    <div className="text-xs font-bold text-gray-900 mt-1">Made Fresh</div>
                    <div className="text-[10px] text-gray-500">Cooked on order</div>
                </div>
                <div className="bg-amber-50/70 p-3 rounded-2xl border border-amber-100">
                    <span className="text-lg">🥩</span>
                    <div className="text-xs font-bold text-gray-900 mt-1">100% Halal</div>
                    <div className="text-[10px] text-gray-500">Prime quality cuts</div>
                </div>
                <div className="bg-emerald-50/70 p-3 rounded-2xl border border-emerald-100">
                    <span className="text-lg">⚡</span>
                    <div className="text-xs font-bold text-gray-900 mt-1">15-20 Min</div>
                    <div className="text-[10px] text-gray-500">Prep time</div>
                </div>
            </div>
        </div>
    );
}
