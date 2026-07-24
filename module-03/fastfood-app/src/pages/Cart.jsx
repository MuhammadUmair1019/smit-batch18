import { useContext } from "react";
import { CartContext } from "../providers/CartProvider";


function Cart() {
    const { cartItems } = useContext(CartContext)



    return (
        <>
            <h1>Cart Items</h1>
        </>
    )
}

export default Cart;