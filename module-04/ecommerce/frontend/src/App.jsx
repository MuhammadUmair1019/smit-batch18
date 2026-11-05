import { useState } from "react";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(false);

  const params = new URLSearchParams(window.location.search);

  const success = params.get("success");
  const canceled = params.get("canceled");

  const handlePayment = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Payment failed");
      }

      console.log(data);
      // Redirect customer to Stripe Checkout
      window.location.href = data.url;
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>My Shopping Store</h1>

      {success ? (
        <div>
          <h2>Payment Successful!</h2>
          <p>Thank you for your purchase.</p>
        </div>
      ) : canceled ? (
        <div>
          <h2>Payment Cancelled</h2>
          <p>You cancelled your payment.</p>
        </div>
      ) : (
        <div className="product">
          <h2>Nike Shoes</h2>
          <h3>$50.00</h3>

          <button onClick={handlePayment} disabled={loading}>
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
