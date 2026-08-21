import { useNavigate } from "react-router-dom";
import { categories } from "../../data/category";

export default function CategoryExplorer() {
    const navigate = useNavigate();

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
                <span className="text-xs font-black uppercase tracking-widest text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                    Freshly Prepared
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-3">
                    Explore Our Delicious Categories
                </h2>
                <p className="text-sm sm:text-base text-gray-600 mt-2">
                    Handcrafted with secret seasonings and premium cuts. Click any category to view full menu options.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {categories.map((cat) => (
                    <div
                        key={cat.id}
                        onClick={() => navigate("/collection")}
                        className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
                    >
                        <div className="relative h-60 overflow-hidden">
                            <img
                                src={cat.image}
                                alt={cat.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                            <span className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                                {cat.badge}
                            </span>
                            <div className="absolute bottom-4 left-4 right-4 text-white">
                                <h3 className="text-2xl font-black">{cat.title}</h3>
                                <p className="text-xs text-gray-200 mt-1 line-clamp-2">
                                    {cat.description}
                                </p>
                            </div>
                        </div>
                        <div className="p-4 bg-white flex items-center justify-between">
                            <span className="text-xs font-bold text-gray-500">{cat.count} mouthwatering items</span>
                            <span className="text-sm font-bold text-orange-500 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                                Browse &rarr;
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
