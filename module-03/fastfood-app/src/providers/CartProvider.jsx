import { createContext, useEffect, useState } from "react";

export const CartContext = createContext()

export default function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([])

    useEffect(() => {
        let items = localStorage.getItem("cartItems");
        if (items) {
            console.log(items)
            setCartItems(JSON.parse(items))
        }
    }, [])

    console.log('carItems -->', cartItems)

    // useEffect(() => {
    //     localStorage.setItem("cartItems", JSON.stringify(cartItems))
    // }, [cartItems])


    const addToCart = (item, quantity, drink) => {
        const cartIndex = cartItems.findIndex(cartItem => {
            return cartItem.id === item.id && cartItem.drink === drink.name
        })

        if (cartIndex === -1) {
            const copyCartItems = [...cartItems, { ...item, quantity, drink: drink.name }]
            setCartItems(copyCartItems)
            localStorage.setItem("cartItems", JSON.stringify(copyCartItems))
        } else {
            const copyItems = [...cartItems];
            copyItems[cartIndex].quantity += quantity;
            setCartItems(copyItems)
            localStorage.setItem("cartItems", JSON.stringify(cartItems))
        }
    }

    const removeCartItem = (item) => {
        const copyCartItems = cartItems.filter(cartItem => {
            if (cartItem.id === item.id && cartItem.drink !== item.drink) {
                return false
            } else {
                return true
            }

            console.log('id -->', cartItem.id !== item.id)
            console.log('drink -->', cartItem.drink !== item.drink)
            // if (cartItem.id !== item.id && cartItem.drink !== item.drink) {
            //     return true
            // } else {
            //     return false
            // }
        })

        setCartItems(copyCartItems)
        localStorage.setItem("cartItems", JSON.stringify(copyCartItems))
    }

    const cartCount = cartItems.reduce((sum, cartItem) => sum + cartItem.quantity, 0);

    const totalCartPrice = cartItems.reduce((sum, cartItem) => sum + (cartItem.price * cartItem.quantity), 0)

    // console.log(totalCartPrice)


    return (
        <CartContext.Provider value={{ cartItems, cartCount, totalCartPrice, addToCart, removeCartItem }}>
            {children}
        </CartContext.Provider>
    )

}