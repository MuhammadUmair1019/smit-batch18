import { Link } from "react-router-dom";

export default function HeroSection() {
    return (
        <section className="relative pt-8 sm:pt-14 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Left Copy */}
                <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-xs sm:text-sm font-extrabold shadow-xs">
                        <span>🔥 FASTEST FAST FOOD DELIVERY IN TOWN</span>
                    </div>

                    <h1 className="text-4xl sm:text-6xl lg:text-6xl font-black text-gray-900 tracking-tight leading-[1.1]">
                        Craving Flavor? <br />
                        <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-red-600 bg-clip-text text-transparent">
                            Hot, Sizzling & Fresh
                        </span>{" "}
                        At Your Doorstep!
                    </h1>

                    <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                        Treat yourself to flame-grilled smash burgers, authentic slow-roasted shawarmas, and crispy wood-fired pizzas crafted with 100% premium ingredients.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                        <Link
                            to="/collection"
                            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-base font-bold px-8 py-4 rounded-2xl shadow-lg shadow-orange-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 cursor-pointer"
                        >
                            <span>Order Now</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </Link>
                        <a
                            href="#deals"
                            className="bg-white hover:bg-orange-50 text-gray-800 hover:text-orange-600 border border-gray-200 text-base font-bold px-7 py-4 rounded-2xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
                        >
                            <span>🎁 View Deals</span>
                        </a>
                    </div>

                    {/* Trust Badges */}
                    <div className="pt-6 border-t border-gray-100 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-center sm:text-left">
                        <div>
                            <div className="text-2xl font-black text-gray-900">30 Min</div>
                            <div className="text-xs text-gray-500 font-medium">Lightning Delivery</div>
                        </div>
                        <div>
                            <div className="text-2xl font-black text-orange-500">100%</div>
                            <div className="text-xs text-gray-500 font-medium">Fresh & Halal</div>
                        </div>
                        <div>
                            <div className="text-2xl font-black text-amber-500">4.9 ★</div>
                            <div className="text-xs text-gray-500 font-medium">Over 5K Reviews</div>
                        </div>
                    </div>
                </div>

                {/* Right Hero Visual */}
                <div className="lg:col-span-5 relative">
                    <div className="relative mx-auto max-w-md lg:max-w-none">
                        {/* Decorative background glow */}
                        <div className="absolute -inset-4 bg-gradient-to-tr from-orange-400 to-amber-300 rounded-3xl blur-2xl opacity-40 -z-10 animate-pulse"></div>

                        {/* Main Hero Card */}
                        <div className="relative bg-white rounded-3xl p-3 shadow-2xl border border-orange-100 overflow-hidden group">
                            <img
                                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900&q=85"
                                alt="FlameBite Signature Gourmet Burger"
                                className="w-full h-80 sm:h-96 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
                            />

                            {/* Floating Banner 1 */}
                            <div className="absolute top-6 left-6 bg-slate-900/90 backdrop-blur-md text-white px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2 border border-slate-700">
                                <span className="text-xl">🍔</span>
                                <div>
                                    <div className="text-xs font-bold">Chef's Signature</div>
                                    <div className="text-[10px] text-amber-400">Classic Beef Burger</div>
                                </div>
                            </div>

                            {/* Floating Banner 2 */}
                            <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-md text-slate-900 px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-orange-200">
                                <div className="w-9 h-9 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold text-sm">
                                    20%
                                </div>
                                <div>
                                    <div className="text-xs font-black text-gray-900">Weekend Promo</div>
                                    <div className="text-[11px] text-orange-600 font-bold">Use: FLAME20</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
