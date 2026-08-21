import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { products } from "../data/products";
import { getReviewsByProduct } from "../data/product-rating";
import { useCart } from "../contextapi/CartContext";
import ProductCard from "../components/ProductCard";
import ProductShowcase from "../components/product-detail/ProductShowcase";
import DrinkSelector from "../components/product-detail/DrinkSelector";
import ReviewList from "../components/product-detail/ReviewList";
import WriteReviewForm from "../components/product-detail/WriteReviewForm";

const drinks = [
    { id: 101, name: "Coca Cola", icon: "🥤" },
    { id: 102, name: "Pepsi", icon: "🥤" },
    { id: 103, name: "Sprite", icon: "🍋" },
    { id: 104, name: "Orange Juice", icon: "🍊" },
    { id: 105, name: "Mineral Water", icon: "💧" },
];

function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart, showToast } = useCart();

    const [quantity, setQuantity] = useState(1);
    const [selectedDrink, setSelectedDrink] = useState(drinks[0]);

    // Local review state initialized from product-rating
    const [productReviews, setProductReviews] = useState(() => {
        return getReviewsByProduct(Number(id));
    });

    // Review form state
    const [newReviewer, setNewReviewer] = useState("");
    const [newRating, setNewRating] = useState(5);
    const [newComment, setNewComment] = useState("");
    const [reviewSubmitted, setReviewSubmitted] = useState(false);

    const product = products.find((p) => p.id === Number(id));

    if (!product) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <div className="text-6xl mb-4">🍔</div>
                <h1 className="text-3xl font-black text-gray-900 mb-2">Item Not Found</h1>
                <p className="text-gray-500 mb-6">The food item you are looking for might have been removed or is unavailable.</p>
                <Link
                    to="/collection"
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl shadow-md inline-block cursor-pointer"
                >
                    Back to Menu
                </Link>
            </div>
        );
    }

    const relatedProducts = products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 3);

    const handleAddReview = (e) => {
        e.preventDefault();
        if (!newReviewer.trim() || !newComment.trim()) return;

        const newReviewObj = {
            id: productReviews.length + 1001,
            productid: product.id,
            username: newReviewer.trim(),
            date: "Just now",
            rating: Number(newRating),
            review: newComment.trim(),
            isApproved: true,
        };

        setProductReviews([newReviewObj, ...productReviews]);
        setNewReviewer("");
        setNewComment("");
        setNewRating(5);
        setReviewSubmitted(true);
        showToast("Thank you! Your review has been submitted.", "success");
        setTimeout(() => setReviewSubmitted(false), 4000);
    };

    const handleAddToCartClick = () => {
        addToCart(product, quantity, selectedDrink);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
                <Link to="/" className="hover:text-orange-600">Home</Link>
                <span>/</span>
                <Link to="/collection" className="hover:text-orange-600">Menu</Link>
                <span>/</span>
                <span className="text-orange-600 font-bold truncate max-w-xs">{product.title}</span>
            </div>

            {/* Product Showcase Box */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-md">
                {/* Left: Product Image & Badges */}
                <ProductShowcase product={product} />

                {/* Right: Product Details & Controls */}
                <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight leading-tight">
                            {product.title}
                        </h1>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1 text-amber-500 text-sm font-black">
                                <span>★ {product.rating.toFixed(1)}</span>
                                <span className="text-gray-400 font-normal">
                                    ({productReviews.length} customer reviews)
                                </span>
                            </div>
                            <span className="text-gray-300">•</span>
                            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                                In Stock & Ready
                            </span>
                        </div>

                        <p className="text-base text-gray-600 leading-relaxed pt-2">
                            {product.description}
                        </p>

                        <div className="text-3xl sm:text-4xl font-black text-gray-900 pt-2">
                            Rs. {product.price.toLocaleString()}
                        </div>
                    </div>

                    {/* Drink Selection */}
                    <DrinkSelector
                        drinks={drinks}
                        selectedDrink={selectedDrink}
                        onSelectDrink={setSelectedDrink}
                    />

                    {/* Quantity & Add to Cart Controls */}
                    <div className="space-y-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-4">
                            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                                Quantity:
                            </span>
                            <div className="flex items-center bg-gray-100 rounded-2xl p-1 border border-gray-200">
                                <button
                                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                    disabled={quantity <= 1}
                                    className="w-10 h-10 rounded-xl bg-white hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed font-black text-gray-800 flex items-center justify-center transition shadow-2xs cursor-pointer"
                                >
                                    -
                                </button>
                                <span className="w-12 text-center font-black text-base text-gray-900">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity((q) => q + 1)}
                                    className="w-10 h-10 rounded-xl bg-white hover:bg-gray-200 font-black text-gray-800 flex items-center justify-center transition shadow-2xs cursor-pointer"
                                >
                                    +
                                </button>
                            </div>
                            <div className="text-xs text-gray-500 font-semibold ml-auto">
                                Subtotal: <span className="text-base font-black text-gray-900">Rs. {(product.price * quantity).toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                            <button
                                onClick={handleAddToCartClick}
                                className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-base py-4 px-8 rounded-2xl shadow-xl shadow-orange-500/25 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                <span>Add to Cart ({quantity})</span>
                            </button>
                            <button
                                onClick={() => {
                                    handleAddToCartClick();
                                    navigate("/cart");
                                }}
                                className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm py-4 px-6 rounded-2xl shadow-md transition-all cursor-pointer"
                            >
                                Buy Now &rarr;
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Customer Reviews Section */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-md space-y-10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
                            Customer Reviews & Ratings
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Verified foodies who enjoyed this dish.
                        </p>
                    </div>
                    <div className="flex items-center gap-3 bg-amber-50 px-4 py-2.5 rounded-2xl border border-amber-200">
                        <span className="text-2xl font-black text-amber-600">{product.rating.toFixed(1)}</span>
                        <div className="text-xs">
                            <div className="font-bold text-gray-900">Overall Rating</div>
                            <div className="text-gray-500">{productReviews.length} Verified Reviews</div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <ReviewList reviews={productReviews} />
                    <WriteReviewForm
                        onSubmit={handleAddReview}
                        reviewer={newReviewer}
                        setReviewer={setNewReviewer}
                        rating={newRating}
                        setRating={setNewRating}
                        comment={newComment}
                        setComment={setNewComment}
                        isSubmitted={reviewSubmitted}
                    />
                </div>
            </div>

            {/* Related Menu Items */}
            {relatedProducts.length > 0 && (
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
                                More Like This
                            </span>
                            <h2 className="text-2xl font-black text-gray-900 mt-1">
                                You Might Also Crave
                            </h2>
                        </div>
                        <Link
                            to="/collection"
                            className="text-xs sm:text-sm font-bold text-orange-600 hover:underline"
                        >
                            View All &rarr;
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {relatedProducts.map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductDetail;