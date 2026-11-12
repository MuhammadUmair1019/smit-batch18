import { useState } from "react";
import "./App.css";

function Subscriptions() {
  const [loading, setLoading] = useState("");

  const params = new URLSearchParams(window.location.search);

  const success = params.get("success");
  const canceled = params.get("canceled");

  const subscribe = async (plan) => {
    try {
      setLoading(plan);

      const response = await fetch(
        "http://localhost:5000/create-subscription",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Add your authentication token here.
            // Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ plan }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Subscription failed");
      }

      window.location.href = data.url;
    } catch (error) {
      alert(error.message);
      setLoading("");
    }
  };

  return (
    <div className="container">
      <h1>Subscription Plans</h1>

      {success ? (
        <div>
          <h2>Subscription Checkout Completed!</h2>
          <p>
            Thank you for subscribing. Your subscription is being confirmed.
          </p>
        </div>
      ) : canceled ? (
        <div>
          <h2>Subscription Cancelled</h2>
        </div>
      ) : (
        <div className="plans">
          <div className="plan">
            <h2>Basic</h2>
            <h3>$5 / month</h3>

            <button disabled={!!loading} onClick={() => subscribe("basic")}>
              {loading === "basic" ? "Processing..." : "Subscribe Basic"}
            </button>
          </div>

          <div className="plan">
            <h2>Premium</h2>
            <h3>$10 / month</h3>

            <button disabled={!!loading} onClick={() => subscribe("premium")}>
              {loading === "premium" ? "Processing..." : "Subscribe Premium"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Subscriptions;
