import { useState } from "react";
import { Link } from "react-router-dom";

export default function Footer() {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email.trim()) {
            setSubscribed(true);
            setEmail("");
            setTimeout(() => setSubscribed(false), 4000);
        }
    };

    return (
        <footer className="bg-slate-900 text-gray-300 pt-16 pb-12 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                    {/* Brand column */}
                    <div className="space-y-4">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-red-500 flex items-center justify-center text-xl shadow-lg">
                                🔥
                            </div>
                            <span className="text-2xl font-black tracking-tight text-white">
                                Flame<span className="text-orange-500">Bite</span>
                            </span>
                        </Link>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Serving mouthwatering burgers, sizzling shawarmas, and cheesy gourmet pizzas freshly prepared with premium ingredients.
                        </p>
                        <div className="flex items-center gap-3 pt-2">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                Kitchen Open Now
                            </span>
                        </div>
                    </div>

                    {/* Quick Menu Links */}
                    <div>
                        <h4 className="text-white font-bold text-base mb-4 tracking-wide uppercase text-xs text-orange-400">
                            Our Menu
                        </h4>
                        <ul className="space-y-2.5 text-sm">
                            <li>
                                <Link to="/collection" className="hover:text-orange-400 transition-colors">
                                    All Fast Food Items
                                </Link>
                            </li>
                            <li>
                                <Link to="/collection" className="hover:text-orange-400 transition-colors">
                                    Gourmet Burgers
                                </Link>
                            </li>
                            <li>
                                <Link to="/collection" className="hover:text-orange-400 transition-colors">
                                    Authentic Shawarmas
                                </Link>
                            </li>
                            <li>
                                <Link to="/collection" className="hover:text-orange-400 transition-colors">
                                    Crispy Artisan Pizzas
                                </Link>
                            </li>
                            <li>
                                <Link to="/cart" className="hover:text-orange-400 transition-colors">
                                    Your Order & Cart
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact & Hours */}
                    <div>
                        <h4 className="text-white font-bold text-base mb-4 tracking-wide uppercase text-xs text-orange-400">
                            Contact & Location
                        </h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li className="flex items-start gap-2.5">
                                <span className="text-orange-400">📍</span>
                                <span>Main Boulevard, Food Street, Phase 5, DHA</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <span className="text-orange-400">📞</span>
                                <span>+92 (300) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <span className="text-orange-400">⏰</span>
                                <span>Mon - Sun: 11:00 AM – 03:00 AM</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <span className="text-orange-400">⚡</span>
                                <span>Average Delivery Time: 25-35 mins</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter & Deals */}
                    <div>
                        <h4 className="text-white font-bold text-base mb-4 tracking-wide uppercase text-xs text-orange-400">
                            Get Secret Deals
                        </h4>
                        <p className="text-sm text-gray-400 mb-3">
                            Subscribe to receive exclusive voucher codes and weekend promo discounts directly.
                        </p>
                        <form onSubmit={handleSubscribe} className="space-y-2">
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="bg-slate-800 border border-slate-700 text-white placeholder-gray-500 text-sm rounded-xl px-3.5 py-2.5 flex-1 focus:outline-none focus:border-orange-500"
                                />
                                <button
                                    type="submit"
                                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-4 py-2.5 rounded-xl transition shadow-md"
                                >
                                    Join
                                </button>
                            </div>
                            {subscribed && (
                                <p className="text-xs text-emerald-400 font-medium animate-fadeIn">
                                    🎉 Awesome! Use code <span className="font-bold text-white">FLAME20</span> on your next order!
                                </p>
                            )}
                        </form>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
                    <p>© {new Date().getFullYear()} FlameBite Fast Food App. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <span className="hover:text-gray-400 cursor-pointer">Privacy Policy</span>
                        <span className="hover:text-gray-400 cursor-pointer">Terms of Service</span>
                        <span className="hover:text-gray-400 cursor-pointer">Safety & Hygiene</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
