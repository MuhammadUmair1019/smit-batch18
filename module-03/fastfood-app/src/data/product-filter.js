import { products } from "./products"

export const getVisibleProducts = (selectedCategories, selectedRating) => {
    let filterProducts = products;
    if (!selectedCategories.length && !selectedRating) {
        return products;
    }

    if (selectedCategories.length > 0) {
        filterProducts = filterProducts.filter(product => selectedCategories.includes(product.category))
    }

    if (selectedRating) {
        filterProducts = filterProducts.filter(p => {
            if (p.rating >= selectedRating) {
                return p
            }
        })
    }

    return filterProducts
}