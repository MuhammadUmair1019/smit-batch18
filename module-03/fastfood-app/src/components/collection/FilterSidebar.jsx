import CategoryFilter from "../CategoryFilter";
import RatingFilter from "../RatingFilter";

export default function FilterSidebar({
    isOpen,
    selectedCategories,
    onChangeCategory,
    selectedRating,
    onChangeRating,
    selectedPrice,
    setSelectedPrice,
    initPriceFilter,
    hasActiveFilters,
    onClearAll,
}) {
    return (
        <aside
            className={`lg:col-span-3 lg:block space-y-6 ${
                isOpen ? "block" : "hidden"
            }`}
        >
            <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-xs space-y-6 sticky top-28">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                    <h2 className="text-base font-black text-gray-900 flex items-center gap-2">
                        <span>🎯</span>
                        <span>Filter Menu</span>
                    </h2>
                    {hasActiveFilters && (
                        <button
                            onClick={onClearAll}
                            className="text-xs text-orange-600 hover:text-orange-700 font-bold cursor-pointer"
                        >
                            Clear All
                        </button>
                    )}
                </div>

                {/* Category Filter */}
                <CategoryFilter
                    selectedCategories={selectedCategories}
                    onChangeCategoryHandler={onChangeCategory}
                />

                <hr className="border-gray-100" />

                {/* Rating Filter */}
                <RatingFilter
                    selectedRating={selectedRating}
                    onChangeRating={onChangeRating}
                />

                <hr className="border-gray-100" />

                {/* Price Range Filter */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">
                            Price Range
                        </h3>
                        {selectedPrice.isApplied && (
                            <button
                                onClick={() => setSelectedPrice(initPriceFilter)}
                                className="text-xs text-orange-600 hover:text-orange-700 font-semibold cursor-pointer"
                            >
                                Reset
                            </button>
                        )}
                    </div>

                    <div className="space-y-2 pt-2">
                        <input
                            type="range"
                            min={initPriceFilter.min}
                            max={initPriceFilter.max}
                            value={selectedPrice.max}
                            onChange={(e) =>
                                setSelectedPrice({
                                    min: initPriceFilter.min,
                                    max: Number(e.target.value),
                                    isApplied: true,
                                })
                            }
                            className="w-full accent-orange-500 cursor-pointer h-2 bg-gray-200 rounded-lg appearance-none"
                        />

                        <div className="flex items-center justify-between text-xs font-bold text-gray-600">
                            <span>Rs. {initPriceFilter.min}</span>
                            <span className="text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-200">
                                Up to Rs. {selectedPrice.max.toLocaleString()}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
