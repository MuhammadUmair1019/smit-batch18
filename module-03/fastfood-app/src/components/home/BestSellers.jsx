import { Link } from "react-router-dom";
import ProductCard from "../ProductCard";

export default function BestSellers({ products }) {
    return (
        <section className="bg-orange-50/50 py-16 border-y border-orange-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
                    <div>
                        <span className="text-xs font-black uppercase tracking-widest text-orange-600 bg-white px-3 py-1 rounded-full border border-orange-200">
                            Top Rated By Foodies
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-3">
                            Chef's Best Sellers
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">
                            The most loved burgers, shawarmas, and pizzas ordered this week.
                        </p>
                    </div>
                    <Link
                        to="/collection"
                        className="inline-flex items-center gap-2 text-sm font-bold text-orange-600 hover:text-orange-700 bg-white hover:bg-orange-100 px-5 py-2.5 rounded-xl border border-orange-200 shadow-xs transition"
                    >
                        <span>View Full Menu</span>
                        <span>&rarr;</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}
