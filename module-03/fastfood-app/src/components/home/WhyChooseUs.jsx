export default function WhyChooseUs() {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl border border-gray-200 p-8 sm:p-12 shadow-sm">
                <div className="text-center max-w-2xl mx-auto mb-10">
                    <h2 className="text-3xl font-black text-gray-900">
                        Why Foodies Choose FlameBite
                    </h2>
                    <p className="text-sm text-gray-600 mt-2">
                        We don't compromise on taste, speed, or ingredient quality.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="text-center space-y-3 p-4 rounded-2xl bg-orange-50/50">
                        <div className="w-12 h-12 bg-orange-500 text-white rounded-2xl flex items-center justify-center text-2xl mx-auto shadow-md">
                            🍔
                        </div>
                        <h4 className="font-bold text-gray-900 text-base">Flame-Grilled Patties</h4>
                        <p className="text-xs text-gray-500 leading-relaxed">
                            Real 100% prime cuts seared on open flame for genuine smoky flavor.
                        </p>
                    </div>

                    <div className="text-center space-y-3 p-4 rounded-2xl bg-amber-50/50">
                        <div className="w-12 h-12 bg-amber-500 text-white rounded-2xl flex items-center justify-center text-2xl mx-auto shadow-md">
                            🚀
                        </div>
                        <h4 className="font-bold text-gray-900 text-base">Super Fast 30-Min</h4>
                        <p className="text-xs text-gray-500 leading-relaxed">
                            Insulated thermal bags keep your burgers steaming hot and fries extra crunchy.
                        </p>
                    </div>

                    <div className="text-center space-y-3 p-4 rounded-2xl bg-emerald-50/50">
                        <div className="w-12 h-12 bg-emerald-500 text-white rounded-2xl flex items-center justify-center text-2xl mx-auto shadow-md">
                            🥗
                        </div>
                        <h4 className="font-bold text-gray-900 text-base">100% Fresh Daily</h4>
                        <p className="text-xs text-gray-500 leading-relaxed">
                            Hand-chopped veggies, house-made pickles, and freshly kneaded pizza dough.
                        </p>
                    </div>

                    <div className="text-center space-y-3 p-4 rounded-2xl bg-rose-50/50">
                        <div className="w-12 h-12 bg-rose-500 text-white rounded-2xl flex items-center justify-center text-2xl mx-auto shadow-md">
                            🥫
                        </div>
                        <h4 className="font-bold text-gray-900 text-base">Secret Craft Sauces</h4>
                        <p className="text-xs text-gray-500 leading-relaxed">
                            Signature garlic creams, smoky BBQ glazes, and spicy burger drizzles.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
