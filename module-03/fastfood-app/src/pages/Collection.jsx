import { useState, useMemo } from "react";
import ProductListing from "../components/ProductListing";
import CollectionToolbar from "../components/collection/CollectionToolbar";
import ActiveFilterChips from "../components/collection/ActiveFilterChips";
import FilterSidebar from "../components/collection/FilterSidebar";
import { getVisibleProducts } from "../data/product-filter";
import { priceRange } from "../data/products";

import { useRestaurant } from "../contextapi/RestaurantContext";

const initPriceFilter = {
    min: priceRange.min,
    max: priceRange.max,
    isApplied: false,
};

function Collection() {
    const { menuItems } = useRestaurant();
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedRating, setSelectedRating] = useState("");
    const [selectedPrice, setSelectedPrice] = useState(initPriceFilter);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("default");
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

    const onChangeCategoryHandler = (category, isChecked) => {
        if (isChecked) {
            setSelectedCategories([...selectedCategories, category]);
        } else {
            setSelectedCategories(selectedCategories.filter((c) => c !== category));
        }
    };

    const handleRemoveCategory = (category) => {
        setSelectedCategories(selectedCategories.filter((c) => c !== category));
    };

    const clearAll = () => {
        setSelectedCategories([]);
        setSelectedRating("");
        setSelectedPrice(initPriceFilter);
        setSearchQuery("");
        setSortBy("default");
    };

    const products = useMemo(() => {
        return getVisibleProducts({
            items: menuItems,
            selectedCategories,
            selectedRating,
            selectedPrice,
            searchQuery,
            sortBy,
        });
    }, [menuItems, selectedCategories, selectedRating, selectedPrice, searchQuery, sortBy]);

    const hasActiveFilters =
        selectedCategories.length > 0 ||
        selectedRating !== "" ||
        selectedPrice.isApplied ||
        searchQuery.trim() !== "";

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            {/* Header Title & Breadcrumb */}
            <div className="mb-8">
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-2">
                    <span>Home</span>
                    <span>/</span>
                    <span className="text-orange-600 font-bold">Our Menu</span>
                </div>
                <div>
                    <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
                        Explore Full Menu
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Browse all our burgers, shawarmas, and pizzas with instant filters.
                    </p>
                </div>
            </div>

            {/* Top Toolbar (Search & Sort) */}
            <CollectionToolbar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                sortBy={sortBy}
                setSortBy={setSortBy}
                hasActiveFilters={hasActiveFilters}
                mobileFilterOpen={mobileFilterOpen}
                setMobileFilterOpen={setMobileFilterOpen}
            />

            {/* Active Filters Chips Bar */}
            <ActiveFilterChips
                selectedCategories={selectedCategories}
                onRemoveCategory={handleRemoveCategory}
                selectedRating={selectedRating}
                onRemoveRating={() => setSelectedRating("")}
                selectedPrice={selectedPrice}
                onResetPrice={() => setSelectedPrice(initPriceFilter)}
                searchQuery={searchQuery}
                onRemoveSearch={() => setSearchQuery("")}
                onClearAll={clearAll}
            />

            {/* Main Content Layout: Sidebar + Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Filters Sidebar */}
                <FilterSidebar
                    isOpen={mobileFilterOpen}
                    selectedCategories={selectedCategories}
                    onChangeCategory={onChangeCategoryHandler}
                    selectedRating={selectedRating}
                    onChangeRating={setSelectedRating}
                    selectedPrice={selectedPrice}
                    setSelectedPrice={setSelectedPrice}
                    initPriceFilter={initPriceFilter}
                    hasActiveFilters={hasActiveFilters}
                    onClearAll={clearAll}
                />

                {/* Products Grid */}
                <main className="lg:col-span-9">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-bold text-gray-600">
                            Showing <span className="text-orange-600 font-extrabold">{products.length}</span> delicious items
                        </span>
                    </div>

                    <ProductListing products={products} onResetFilters={clearAll} />
                </main>
            </div>
        </div>
    );
}

export default Collection;
