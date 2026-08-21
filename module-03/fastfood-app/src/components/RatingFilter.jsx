function RenderStars({ rating, selectedRating, onChangeRating }) {
    const isSelected = selectedRating === rating;

    return (
        <button
            type="button"
            onClick={() => onChangeRating(isSelected ? "" : rating)}
            className={`w-full flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all border text-left ${
                isSelected
                    ? "bg-amber-50 border-amber-300 shadow-xs"
                    : "bg-white border-transparent hover:bg-gray-50 text-gray-700"
            }`}
        >
            <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                        key={star}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill={star <= rating ? "#F59E0B" : "#E2E8F0"}
                        className="w-4 h-4"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                        />
                    </svg>
                ))}
                <span className="text-xs font-semibold text-gray-600 ml-1">
                    {rating}.0 & up
                </span>
            </div>
            {isSelected && (
                <span className="text-xs text-amber-600 font-bold">✓ Active</span>
            )}
        </button>
    );
}

function RatingFilter({ selectedRating, onChangeRating }) {
    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">
                    Minimum Rating
                </h3>
                {selectedRating && (
                    <button
                        onClick={() => onChangeRating("")}
                        className="text-xs text-orange-600 hover:text-orange-700 font-semibold"
                    >
                        Reset
                    </button>
                )}
            </div>
            <div className="space-y-1">
                {[5, 4, 3, 2].map((rating) => (
                    <RenderStars
                        key={rating}
                        rating={rating}
                        selectedRating={selectedRating}
                        onChangeRating={onChangeRating}
                    />
                ))}
            </div>
        </div>
    );
}

export default RatingFilter;