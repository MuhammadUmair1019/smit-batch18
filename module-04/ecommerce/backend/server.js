
const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");
require("dotenv").config();

const app = express();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors({
    origin: process.env.FRONTEND_URL
}));

app.use(express.json());

// Create Stripe Checkout Session
app.post("/create-checkout-session", async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            // payment_method_types: ["card"],

            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: "Nike Shoes"
                        },
                        unit_amount: 5000 // $50.00
                    },
                    quantity: 1
                }
            ],

            mode: "payment",

            success_url:
                `${process.env.FRONTEND_URL}/?success=true&session_id={CHECKOUT_SESSION_ID}`,

            cancel_url:
                `${process.env.FRONTEND_URL}/?canceled=true`
        });

        res.json({
            url: session.url
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Payment session creation failed"
        });
    }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
