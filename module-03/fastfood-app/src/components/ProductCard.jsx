import { useNavigate } from "react-router-dom";
import { useCart } from "../contextapi/CartContext";

function ProductCard({ product }) {
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const handleQuickAdd = (e) => {
        e.stopPropagation();
        addToCart(product, 1, { name: "Coca Cola" });
    };

    return (
        <div
            onClick={() => navigate(`/collection/${product.id}`)}
            className="group relative bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between"
        >
            {/* Top Image Container */}
            <div className="relative h-56 sm:h-64 overflow-hidden bg-gray-100">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    loading="lazy"
                />
                
                {/* Category Pill */}
                <span className="absolute top-3.5 left-3.5 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                    {product.category}
                </span>

                {/* Rating Badge */}
                <div className="absolute top-3.5 right-3.5 bg-amber-400 text-slate-950 font-black text-xs px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span>{product.rating.toFixed(1)}</span>
                </div>
            </div>

            {/* Content Body */}
            <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-1">
                        {product.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1.5 line-clamp-2 leading-relaxed">
                        {product.description}
                    </p>
                </div>

                {/* Price and Add Button */}
                <div className="mt-4 pt-3.5 border-t border-gray-100 flex items-center justify-between gap-2">
                    <div>
                        <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold block">
                            Price
                        </span>
                        <span className="text-xl font-black text-gray-900">
                            Rs. {product.price.toLocaleString()}
                        </span>
                    </div>

                    <button
                        onClick={handleQuickAdd}
                        title="Quick Add to Cart (Default Drink: Coca Cola)"
                        className="bg-orange-50 hover:bg-orange-500 text-orange-600 hover:text-white p-2.5 rounded-2xl font-bold transition-all duration-200 shadow-xs hover:shadow-md hover:scale-105 active:scale-95 flex items-center gap-1.5 text-xs"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                        </svg>
                        <span className="font-bold">Add</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;