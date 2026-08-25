import { doc, writeBatch, serverTimestamp } from "firebase/firestore";
import { db } from "./config";
import { products } from "../data/products";
import { categories } from "../data/category";
import { initialReviews } from "../data/product-rating";

const initialCoupons = [
    {
        code: "FLAME20",
        type: "percentage",
        value: 20,
        description: "20% Weekend Discount on orders above Rs. 1000",
        minOrder: 1000,
        isActive: true,
    },
    {
        code: "FREEDEL",
        type: "free_delivery",
        value: 150,
        description: "Free Delivery Claimed across all orders",
        minOrder: 0,
        isActive: true,
    },
    {
        code: "BITE100",
        type: "fixed",
        value: 100,
        description: "Flat Rs. 100 Off on your next meal",
        minOrder: 500,
        isActive: true,
    },
];

export async function seedFirestoreDatabase() {
    try {
        const batch = writeBatch(db);

        // 1. Seed Menu Items
        products.forEach((product) => {
            const menuRef = doc(db, "menu", product.id.toString());
            batch.set(menuRef, {
                ...product,
                isAvailable: true,
                updatedAt: serverTimestamp(),
            });
        });

        // 2. Seed Categories
        categories.forEach((cat) => {
            const catRef = doc(db, "categories", cat.id.toString());
            batch.set(catRef, {
                ...cat,
                updatedAt: serverTimestamp(),
            });
        });

        // 3. Seed Reviews
        initialReviews.forEach((rev) => {
            const revRef = doc(db, "reviews", rev.id.toString());
            batch.set(revRef, {
                ...rev,
                createdAt: serverTimestamp(),
            });
        });

        // 4. Seed Coupons
        initialCoupons.forEach((coupon) => {
            const couponRef = doc(db, "coupons", coupon.code);
            batch.set(couponRef, {
                ...coupon,
                updatedAt: serverTimestamp(),
            });
        });

        await batch.commit();

        return {
            success: true,
            menuCount: products.length,
            categoryCount: categories.length,
            reviewCount: initialReviews.length,
            couponCount: initialCoupons.length,
        };
    } catch (error) {
        console.error("Failed to seed Firestore:", error);
        return {
            success: false,
            error: error.message,
        };
    }
}
