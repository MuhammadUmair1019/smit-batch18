import { Link } from "react-router-dom";

export default function PromoBanner() {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-orange-600 via-amber-500 to-red-600 rounded-3xl p-8 sm:p-14 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
                <div className="space-y-4 text-center md:text-left max-w-xl">
                    <span className="bg-black/20 text-white text-xs font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider">
                        Ready to eat?
                    </span>
                    <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                        Your Favorite Food is Only a Few Clicks Away!
                    </h2>
                    <p className="text-sm sm:text-base text-orange-100 leading-relaxed">
                        Order now and customize with your choice of refreshing ice-cold drinks.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                        to="/collection"
                        className="bg-white text-gray-900 hover:bg-orange-50 font-black text-base px-8 py-4 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all text-center cursor-pointer"
                    >
                        Explore Full Menu
                    </Link>
                </div>
            </div>
        </section>
    );
}
