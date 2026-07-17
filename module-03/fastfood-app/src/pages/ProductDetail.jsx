import { useParams } from "react-router-dom"
import { products } from "../data/products"
import { useContext, useState } from "react"
import { CartContext } from "../context/CartProvider"

const drinks = [
    { id: 101, name: "Coca Cola" },
    { id: 102, name: "Pepsi" },
    { id: 103, name: "Sprite" },
    { id: 104, name: "Orange Juice" },
    { id: 105, name: "Water" },
];


function ProductDetail() {
    const { id } = useParams()
    let [quantity, setQuantity] = useState(1)
    const [selectedDrink, setSelectedDrink] = useState(drinks[0]);
    const { addToCart, cartItems } = useContext(CartContext)

    const product = products.find(product => product.id === +id)

    if (!product) {
        return <h1> Oops! Page not found</h1>
    }

    console.log("cartItems", cartItems)
    // console.log("selectedDrink", selectedDrink)

    return (
        <div>
            <h1> Product Detail</h1>
            <h2>Title: {product.title} </h2>
            <h2>Description: {product.description} </h2>
            <img src={product.image} width="300" />
            <hr />
            <div className="mb-6">
                <label className="block text-lg font-semibold text-gray-800 mb-3">
                    Select Drink:
                </label>
                <select
                    value={selectedDrink.id}
                    onChange={(e) => {
                        const drink = drinks.find((d) => d.id === parseInt(e.target.value));
                        setSelectedDrink(drink);
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                >
                    {drinks.map((drink) => (
                        <option key={drink.id} value={drink.id}>
                            {drink.name}
                        </option>
                    ))}
                </select>
            </div>
            <hr />
            <div className="p-3">
                <button className="border p-2" onClick={() => setQuantity(quantity++)}>+</button>
                {quantity}
                <button className="border p-2" disabled={quantity === 1} onClick={() => setQuantity(quantity--)}>-</button>
            </div>
            <button onClick={() => addToCart(product, quantity, selectedDrink)} className="border border-blue-600 p-3 mx-3 hover:bg-blue-200 cursor-pointer">Add to Cart</button>
        </div>
    )
}

export default ProductDetail