import { products } from "./products"

export const getVisibleProducts = (selectedCategories) => {
    if (!selectedCategories.length) {
        return products;
    }
    const p = products.filter(product => selectedCategories.includes(product.category))
    return p
}