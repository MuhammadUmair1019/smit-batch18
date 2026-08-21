import { products } from "./products";

export const getVisibleProducts = ({
    items = null,
    selectedCategories = [],
    selectedRating = "",
    selectedPrice = { min: 0, max: 99999, isApplied: false },
    searchQuery = "",
    sortBy = "default"
} = {}) => {
    let filterProducts = items && items.length > 0 ? [...items] : [...products];

    // Filter by Categories
    if (selectedCategories && selectedCategories.length > 0) {
        filterProducts = filterProducts.filter(product =>
            selectedCategories.includes(product.category)
        );
    }

    // Filter by Minimum Rating
    if (selectedRating) {
        filterProducts = filterProducts.filter(product =>
            product.rating >= parseFloat(selectedRating)
        );
    }

    // Filter by Price Range
    if (selectedPrice && selectedPrice.isApplied) {
        filterProducts = filterProducts.filter(product =>
            product.price >= selectedPrice.min && product.price <= selectedPrice.max
        );
    }

    // Filter by Search Query (title or description or category)
    if (searchQuery && searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase().trim();
        filterProducts = filterProducts.filter(product =>
            product.title.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query)
        );
    }

    // Sorting
    if (sortBy === "price-asc") {
        filterProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
        filterProducts.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating-desc") {
        filterProducts.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "name-asc") {
        filterProducts.sort((a, b) => a.title.localeCompare(b.title));
    }

    return filterProducts;
};