import { products } from "./products"

export const getVisibleProducts = (selectedCategories, selectedRating, selectedPrice) => {
    let filterProducts = products;
    if (!selectedCategories.length && !selectedRating && !selectedPrice.isApplied) {
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

    if (selectedPrice.isApplied) {
        filterProducts = filterProducts.filter(product => product.price >= selectedPrice.min && product.price <= selectedPrice.max)
    }


    return filterProducts
}