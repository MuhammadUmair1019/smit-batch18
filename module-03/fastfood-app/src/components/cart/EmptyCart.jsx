import { Link } from "react-router-dom";

export default function EmptyCart() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
            <div className="w-24 h-24 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto text-5xl shadow-inner">
                🛒
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900">
                Your Cart is Hungry & Empty
            </h1>
            <p className="text-sm sm:text-base text-gray-500 max-w-md mx-auto">
                You haven't added any juicy burgers, delicious shawarmas, or hot pizzas yet!
            </p>
            <div className="pt-2">
                <Link
                    to="/collection"
                    className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-base px-8 py-4 rounded-2xl shadow-lg shadow-orange-500/25 inline-flex items-center gap-2 transition hover:scale-105 active:scale-95 cursor-pointer"
                >
                    <span>Explore Our Menu</span>
                    <span>&rarr;</span>
                </Link>
            </div>
        </div>
    );
}
