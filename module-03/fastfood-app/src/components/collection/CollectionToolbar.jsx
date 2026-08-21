export default function CollectionToolbar({
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    hasActiveFilters,
    mobileFilterOpen,
    setMobileFilterOpen,
}) {
    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-8 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search input */}
            <div className="relative flex-1">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search menu by food name, ingredient, category..."
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white transition"
                />
                <svg
                    className="w-5 h-5 text-gray-400 absolute left-3 top-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {searchQuery && (
                    <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 text-sm font-bold cursor-pointer"
                    >
                        ✕
                    </button>
                )}
            </div>

            {/* Sort selector & Mobile filter trigger */}
            <div className="flex items-center justify-between sm:justify-end gap-3">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-500 whitespace-nowrap">
                        Sort By:
                    </span>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400 cursor-pointer"
                    >
                        <option value="default">Default / Recommended</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="rating-desc">Highest Customer Rating</option>
                        <option value="name-asc">Item Name: A to Z</option>
                    </select>
                </div>

                <button
                    onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                    className="lg:hidden flex items-center gap-1.5 bg-orange-50 text-orange-600 border border-orange-200 px-3.5 py-2.5 rounded-xl font-bold text-xs shadow-xs cursor-pointer"
                >
                    <span>⚙️ Filters</span>
                    {hasActiveFilters && (
                        <span className="w-2 h-2 rounded-full bg-orange-600"></span>
                    )}
                </button>
            </div>
        </div>
    );
}
