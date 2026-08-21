import ProductCard from "./ProductCard";

function ProductListing({ products, onResetFilters }) {
    if (!products || products.length === 0) {
        return (
            <div className="bg-white rounded-3xl border border-dashed border-gray-300 p-12 text-center my-6">
                <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                    🔍
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Delicious Matches Found</h3>
                <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
                    We couldn't find any menu items matching your specific filters or search keywords. Try adjusting your filters or price range.
                </p>
                {onResetFilters && (
                    <button
                        onClick={onResetFilters}
                        className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-md transition"
                    >
                        Reset All Filters
                    </button>
                )}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}

export default ProductListing;