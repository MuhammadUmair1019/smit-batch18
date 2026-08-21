export default function ActiveFilterChips({
    selectedCategories,
    onRemoveCategory,
    selectedRating,
    onRemoveRating,
    selectedPrice,
    onResetPrice,
    searchQuery,
    onRemoveSearch,
    onClearAll,
}) {
    const hasActiveFilters =
        selectedCategories.length > 0 ||
        selectedRating !== "" ||
        selectedPrice.isApplied ||
        searchQuery.trim() !== "";

    if (!hasActiveFilters) return null;

    return (
        <div className="flex flex-wrap items-center gap-2 mb-6 p-3 bg-orange-50/60 rounded-xl border border-orange-100 animate-fadeIn">
            <span className="text-xs font-bold text-gray-600">Active Filters:</span>

            {selectedCategories.map((cat) => (
                <span
                    key={cat}
                    className="inline-flex items-center gap-1.5 bg-white text-orange-700 text-xs font-semibold px-2.5 py-1 rounded-lg border border-orange-200 shadow-2xs"
                >
                    <span>{cat}</span>
                    <button
                        onClick={() => onRemoveCategory(cat)}
                        className="text-orange-500 hover:text-orange-800 font-bold cursor-pointer"
                    >
                        ✕
                    </button>
                </span>
            ))}

            {selectedRating && (
                <span className="inline-flex items-center gap-1.5 bg-white text-amber-700 text-xs font-semibold px-2.5 py-1 rounded-lg border border-amber-200 shadow-2xs">
                    <span>Rating: {selectedRating}★+</span>
                    <button
                        onClick={onRemoveRating}
                        className="text-amber-500 hover:text-amber-800 font-bold cursor-pointer"
                    >
                        ✕
                    </button>
                </span>
            )}

            {selectedPrice.isApplied && (
                <span className="inline-flex items-center gap-1.5 bg-white text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-lg border border-emerald-200 shadow-2xs">
                    <span>Max: Rs. {selectedPrice.max}</span>
                    <button
                        onClick={onResetPrice}
                        className="text-emerald-500 hover:text-emerald-800 font-bold cursor-pointer"
                    >
                        ✕
                    </button>
                </span>
            )}

            {searchQuery && (
                <span className="inline-flex items-center gap-1.5 bg-white text-gray-700 text-xs font-semibold px-2.5 py-1 rounded-lg border border-gray-200 shadow-2xs">
                    <span>Query: "{searchQuery}"</span>
                    <button
                        onClick={onRemoveSearch}
                        className="text-gray-500 hover:text-gray-800 font-bold cursor-pointer"
                    >
                        ✕
                    </button>
                </span>
            )}

            <button
                onClick={onClearAll}
                className="text-xs text-red-600 hover:text-red-700 font-bold underline ml-auto cursor-pointer"
            >
                Reset All
            </button>
        </div>
    );
}
