import { useEffect, useState } from "react";
import { CartContext } from "../contextapi/CartContext";

export default function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const saved = localStorage.getItem("cartItems");
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    const [toast, setToast] = useState(null);

    const showToast = (message, type = "success") => {
        setToast({ id: `${Date.now()}-${Math.random()}`, message, type });
        setTimeout(() => {
            setToast(null);
        }, 3000);
    };

    useEffect(() => {
        try {
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
        } catch (error) {
            console.error("Failed to save cart to localStorage", error);
        }
    }, [cartItems]);

    const addToCart = (item, quantity = 1, drink = { name: "Coca Cola" }) => {
        const drinkName = typeof drink === "string" ? drink : (drink?.name || "Coca Cola");
        
        setCartItems((prevItems) => {
            const existingIndex = prevItems.findIndex(
                (ci) => ci.id === item.id && ci.drink === drinkName
            );

            if (existingIndex > -1) {
                const updated = [...prevItems];
                updated[existingIndex] = {
                    ...updated[existingIndex],
                    quantity: updated[existingIndex].quantity + quantity,
                };
                return updated;
            } else {
                return [
                    ...prevItems,
                    {
                        ...item,
                        quantity,
                        drink: drinkName,
                        cartKey: `${item.id}-${drinkName}`,
                    },
                ];
            }
        });

        showToast(`Added ${quantity}x "${item.title}" (${drinkName}) to cart!`, "success");
    };

    const removeCartItem = (item) => {
        setCartItems((prevItems) =>
            prevItems.filter(
                (ci) => !(ci.id === item.id && ci.drink === item.drink)
            )
        );
        showToast(`Removed "${item.title}" from cart`, "info");
    };

    const updateQuantity = (item, newQuantity) => {
        if (newQuantity <= 0) {
            removeCartItem(item);
            return;
        }

        setCartItems((prevItems) =>
            prevItems.map((ci) => {
                if (ci.id === item.id && ci.drink === item.drink) {
                    return { ...ci, quantity: newQuantity };
                }
                return ci;
            })
        );
    };

    const clearCart = () => {
        setCartItems([]);
        showToast("Cart has been cleared", "info");
    };

    const cartCount = cartItems.reduce((sum, cartItem) => sum + cartItem.quantity, 0);

    const totalCartPrice = cartItems.reduce(
        (sum, cartItem) => sum + cartItem.price * cartItem.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                cartItems,
                cartCount,
                totalCartPrice,
                addToCart,
                removeCartItem,
                updateQuantity,
                clearCart,
                toast,
                showToast,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}