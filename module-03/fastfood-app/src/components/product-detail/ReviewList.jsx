export default function ReviewList({ reviews }) {
    if (!reviews || reviews.length === 0) {
        return (
            <div className="lg:col-span-7 p-6 rounded-2xl bg-gray-50 border border-dashed border-gray-200 text-center">
                <p className="text-sm text-gray-500 italic">
                    No reviews yet for this product. Be the first to share your thoughts!
                </p>
            </div>
        );
    }

    return (
        <div className="lg:col-span-7 space-y-4">
            {reviews.map((rev) => (
                <div
                    key={rev.id}
                    className="p-5 rounded-2xl bg-gray-50 border border-gray-100 space-y-2 hover:bg-orange-50/30 transition"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-400 to-amber-500 text-white font-bold text-xs flex items-center justify-center">
                                {rev.username.charAt(0)}
                            </div>
                            <div>
                                <div className="text-sm font-bold text-gray-900">{rev.username}</div>
                                <div className="text-[10px] text-gray-400">{rev.date}</div>
                            </div>
                        </div>
                        <div className="flex items-center text-amber-500 text-xs font-bold">
                            {"★".repeat(Math.round(rev.rating))}
                            <span className="text-gray-600 ml-1">({rev.rating})</span>
                        </div>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pt-1">
                        "{rev.review}"
                    </p>
                </div>
            ))}
        </div>
    );
}
