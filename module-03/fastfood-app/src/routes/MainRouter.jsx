import { Link, Route, Routes } from "react-router-dom";
import Collection from "../pages/Collection";
import Home from "../pages/Home";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import { useContext } from "react";
import { CartContext } from "../providers/CartProvider";


function MainRouter() {
  const { cartCount, cartItems, totalCartPrice, removeCartItem } = useContext(CartContext)

  return (
    <>

      <div>

        <ul className="flex gap-3">
          <li>
            <Link to="/" className="underline text-blue-400 hover:text-blue-600"> Home</Link>
          </li>
          <li>
            <Link to="/collection" className="underline text-blue-400 hover:text-blue-600"> Collection</Link>
          </li>
          <li>
            <Link to="/cart" className="underline text-blue-400 hover:text-blue-600"> Cart</Link>
          </li>
        </ul>
        <button className="bg-green-400 max-w-xs p-3">Cart Count: {cartCount}</button>
        <button className="bg-green-400 max-w-xs p-3">Total Price: {totalCartPrice}</button>
      </div>

      <div>
        <h1>   Cart Items:</h1>

        {cartItems.map(cartItem => (
          <div className="border">
            <h1> {cartItem.title}</h1>
            <h1> Drink: {cartItem.drink}</h1>
            <h1> {cartItem.title}</h1>
            <h3>Qty: {cartItem.quantity}</h3>
            <h3>Price: {cartItem.quantity * cartItem.price}</h3>
            <button className="bg-red-500 border" onClick={() => removeCartItem(cartItem)}>Remove</button>
            <hr />
          </div>
        ))}
      </div>
      <hr />
      <hr />
      <hr />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/collection/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  )
}

export default MainRouter;