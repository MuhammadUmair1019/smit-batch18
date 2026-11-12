import { useState } from "react";
import "./App.css";
import Subscriptions from "./Subscriptions";

const PRODUCTS = [
  {
    id: "nike-shoes",
    name: "Nike Shoes",
    price: 50,
  },
  {
    id: "nike-shirt",
    name: "Nike Shirt",
    price: 25,
  },
  {
    id: "nike-cap",
    name: "Nike Cap",
    price: 15,
  },
];

function App() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const params = new URLSearchParams(window.location.search);

  const success = params.get("success");
  const canceled = params.get("canceled");

  // Add product to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);

      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Update quantity
  const updateQuantity = (id, quantity) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: Number(quantity) } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  // Remove product
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Calculate frontend display total
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Checkout
  const handlePayment = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cartItems: cart.map((item) => ({
              productId: item.id,
              quantity: item.quantity,
            })),
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Payment failed");
      }

      window.location.href = data.url;
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  return (
    <Subscriptions />
    // <div className="container">
    //   <h1>My Shopping Store</h1>

    //   {success ? (
    //     <div>
    //       <h2>Payment Successful!</h2>
    //       <p>Thank you for your purchase.</p>
    //     </div>
    //   ) : canceled ? (
    //     <div>
    //       <h2>Payment Cancelled</h2>
    //       <p>You cancelled your payment.</p>
    //     </div>
    //   ) : (
    //     <>
    //       <h2>Products</h2>

    //       <div className="products">
    //         {PRODUCTS.map((product) => (
    //           <div className="product" key={product.id}>
    //             <h3>{product.name}</h3>
    //             <p>${product.price.toFixed(2)}</p>

    //             <button onClick={() => addToCart(product)}>Add to Cart</button>
    //           </div>
    //         ))}
    //       </div>

    //       <hr />

    //       <h2>Your Cart</h2>

    //       {cart.length === 0 ? (
    //         <p>Your cart is empty.</p>
    //       ) : (
    //         cart.map((item) => (
    //           <div className="cart-item" key={item.id}>
    //             <h3>{item.name}</h3>

    //             <p>${item.price.toFixed(2)}</p>

    //             <input
    //               type="number"
    //               min="0"
    //               max="99"
    //               value={item.quantity}
    //               onChange={(e) => updateQuantity(item.id, e.target.value)}
    //             />

    //             <button onClick={() => removeFromCart(item.id)}>Remove</button>
    //           </div>
    //         ))
    //       )}

    //       <h2>Total: ${total.toFixed(2)}</h2>

    //       <button
    //         onClick={handlePayment}
    //         disabled={loading || cart.length === 0}
    //       >
    //         {loading ? "Processing..." : "Checkout"}
    //       </button>
    //     </>
    //   )}
    // </div>
  );
}

export default App;

// import { useState } from "react";
// import "./App.css";

// function App() {
//   const [loading, setLoading] = useState(false);

//   const params = new URLSearchParams(window.location.search);

//   const success = params.get("success");
//   const canceled = params.get("canceled");

//   const handlePayment = async () => {
//     try {
//       setLoading(true);

//       const response = await fetch(
//         "http://localhost:5000/create-checkout-session",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         },
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || "Payment failed");
//       }

//       console.log(data);
//       // Redirect customer to Stripe Checkout
//       window.location.href = data.url;
//     } catch (error) {
//       alert(error.message);
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container">
//       <h1>My Shopping Store</h1>

//       {success ? (
//         <div>
//           <h2>Payment Successful!</h2>
//           <p>Thank you for your purchase.</p>
//         </div>
//       ) : canceled ? (
//         <div>
//           <h2>Payment Cancelled</h2>
//           <p>You cancelled your payment.</p>
//         </div>
//       ) : (
//         <div className="product">
//           <h2>Nike Shoes</h2>
//           <h3>$50.00</h3>

//           <button onClick={handlePayment} disabled={loading}>
//             {loading ? "Processing..." : "Pay Now"}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;
