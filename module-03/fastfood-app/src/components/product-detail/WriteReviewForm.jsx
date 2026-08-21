export default function WriteReviewForm({
    onSubmit,
    reviewer,
    setReviewer,
    rating,
    setRating,
    comment,
    setComment,
    isSubmitted,
}) {
    return (
        <div className="lg:col-span-5 bg-orange-50/60 p-6 rounded-3xl border border-orange-100">
            <h3 className="text-lg font-bold text-gray-900 mb-1">
                Share Your Experience
            </h3>
            <p className="text-xs text-gray-500 mb-4">
                How was the flavor, crunch, and delivery?
            </p>

            <form onSubmit={onSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Your Name</label>
                    <input
                        type="text"
                        required
                        value={reviewer}
                        onChange={(e) => setReviewer(e.target.value)}
                        placeholder="e.g. Hamza Tariq"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Rating</label>
                    <select
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400 cursor-pointer"
                    >
                        <option value={5}>★★★★★ (5.0 - Exceptional)</option>
                        <option value={4}>★★★★☆ (4.0 - Very Good)</option>
                        <option value={3}>★★★☆☆ (3.0 - Average)</option>
                        <option value={2}>★★☆☆☆ (2.0 - Below Average)</option>
                        <option value={1}>★☆☆☆☆ (1.0 - Poor)</option>
                    </select>
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Your Review</label>
                    <textarea
                        required
                        rows="3"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Describe the taste, sauces, and freshness..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm py-3 rounded-xl shadow-md transition active:scale-95 cursor-pointer"
                >
                    Submit Review
                </button>

                {isSubmitted && (
                    <p className="text-xs font-bold text-emerald-600 text-center animate-fadeIn">
                        🎉 Review added successfully!
                    </p>
                )}
            </form>
        </div>
    );
}
