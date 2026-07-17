import { createContext, useState } from "react";

export const CartContext = createContext()


export default function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([])

    const addToCart = (item, quantity, drink) => {
        const cartIndex = cartItems.findIndex(cartItem => {
            return cartItem.id === item.id && cartItem.drink === drink.name
        })

        if (cartIndex === -1) {
            const copyCartItems = [...cartItems, { ...item, quantity, drink: drink.name }]
            setCartItems(copyCartItems)
        } else {
            const copyItems = [...cartItems];
            copyItems[cartIndex].quantity += quantity;

            setCartItems(copyItems)
        }
    }



    return (
        <CartContext.Provider value={{ cartItems, addToCart }}>
            {children}
        </CartContext.Provider>
    )

}