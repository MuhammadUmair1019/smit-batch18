
const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");
const crypto = require("crypto");
require("dotenv").config();

const app = express();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors({
    origin: process.env.FRONTEND_URL
}));



// ===================================
// 1. STRIPE WEBHOOK
// ===================================

app.post(
    "/webhook",
    express.raw({ type: "application/json" }),
    async (req, res) => {

        const signature = req.headers["stripe-signature"];

        console.log("signature", signature)

        let event;

        // Verify that this request actually came from Stripe
        try {
            event = stripe.webhooks.constructEvent(
                req.body,
                signature,
                process.env.STRIPE_WEBHOOK_SECRET
            );
        } catch (error) {
            console.error("Webhook verification failed:", error.message);

            return res.status(400).send("Invalid webhook signature");
        }

        console.log("Stripe Event:", event.type);

        // Process event
        try {

            switch (event.type) {

                // Checkout completed
                case "checkout.session.completed": {

                    const session = event.data.object;

                    if (session.mode === "subscription") {

                        console.log("Subscription checkout completed");

                        console.log("Customer:", session.customer);

                        console.log("Subscription:", session.subscription);

                        console.log("User ID:", session.metadata.userId);

                        // TODO: Save subscription/customer IDs
                        // against the authenticated user in DB.
                    }

                    break;
                }

                // Subscription created
                case "customer.subscription.created": {

                    const subscription = event.data.object;

                    console.log("Subscription Created");

                    console.log("Subscription ID:", subscription.id);

                    console.log("Status:", subscription.status);

                    console.log("Customer:", subscription.customer);

                    // TODO: Save subscription in database.

                    break;
                }

                // Subscription updated
                case "customer.subscription.updated": {

                    const subscription = event.data.object;

                    console.log("Subscription Updated");

                    console.log("Status:", subscription.status);

                    console.log(
                        "Cancel at period end:",
                        subscription.cancel_at_period_end
                    );

                    // TODO: Update subscription in database.

                    break;
                }

                // Subscription deleted
                case "customer.subscription.deleted": {

                    const subscription = event.data.object;

                    console.log("Subscription Deleted");

                    console.log("Subscription ID:", subscription.id);

                    // TODO: Mark subscription as canceled/ended.
                    // Update user access based on your policy.

                    break;
                }

                // Recurring payment successful
                case "invoice.paid": {

                    const invoice = event.data.object;

                    console.log("Invoice Paid");

                    console.log("Invoice ID:", invoice.id);

                    console.log("Customer:", invoice.customer);

                    console.log("Amount:", invoice.amount_paid);

                    // TODO: Save invoice/payment history.

                    break;
                }

                // Recurring payment failed
                case "invoice.payment_failed": {

                    const invoice = event.data.object;

                    console.log("Invoice Payment Failed");

                    console.log("Customer:", invoice.customer);

                    // TODO: Notify customer.
                    // Record failed payment.
                    // Apply grace-period policy.

                    break;
                }

                default:
                    console.log("Unhandled event:", event.type);
            }

            // Tell Stripe we received the event.
            return res.status(200).json({
                received: true
            });

        } catch (error) {

            console.error("Webhook processing error:", error);

            // Non-2xx tells Stripe that delivery failed.
            return res.status(500).json({
                error: "Webhook processing failed"
            });
        }
    }
);



app.use(express.json());

// Example product database
// In production, fetch products from your database.
const products = {
    "nike-shoes": {
        name: "Nike Shoes",
        price: 5000 // cents
    },
    "nike-shirt": {
        name: "Nike Shirt",
        price: 2500
    },
    "nike-cap": {
        name: "Nike Cap",
        price: 1500
    }
};

// Available plans
const plans = {
    basic: process.env.STRIPE_BASIC_PRICE_ID,
    premium: process.env.STRIPE_PREMIUM_PRICE_ID
};

// Create Checkout Session
app.post("/create-checkout-session", async (req, res) => {
    try {
        const { cartItems } = req.body;

        if (!Array.isArray(cartItems) || cartItems.length === 0) {
            return res.status(400).json({
                error: "Cart is empty"
            });
        }

        // Validate cart and calculate prices on backend
        const lineItems = cartItems.map(item => {
            const product = products[item.productId];

            if (!product) {
                throw new Error(
                    `Invalid product: ${item.productId}`
                );
            }

            const quantity = Number(item.quantity);

            if (
                !Number.isInteger(quantity) ||
                quantity < 1 ||
                quantity > 99
            ) {
                throw new Error("Invalid product quantity");
            }

            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: product.name
                    },
                    unit_amount: product.price
                },
                quantity
            };
        });

        // Unique order ID for every checkout
        const orderId = crypto.randomUUID();

        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,

            mode: "payment",

            metadata: {
                orderId
            },

            success_url:
                `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,

            cancel_url:
                `${process.env.FRONTEND_URL}/cancel?order_id=${orderId}`
        });

        res.json({
            orderId,
            sessionId: session.id,
            url: session.url
        });

    } catch (error) {
        console.error(error);

        res.status(400).json({
            error: error.message ||
                "Payment session creation failed"
        });
    }
});

// Create subscription checkout
app.post("/create-subscription", async (req, res) => {
    try {
        const { plan } = req.body;

        const priceId = plans[plan];

        if (!priceId) {
            return res.status(400).json({
                error: "Invalid subscription plan"
            });
        }

        // In production, obtain this from your
        // authenticated user's database record.
        const userId = req.user?.id || 'dummy-id';

        if (!userId) {
            return res.status(401).json({
                error: "Authentication required"
            });
        }

        const session = await stripe.checkout.sessions.create({
            mode: "subscription",

            line_items: [
                {
                    price: priceId,
                    quantity: 1
                }
            ],

            client_reference_id: String(userId),

            metadata: {
                userId: String(userId)
            },

            subscription_data: {
                metadata: {
                    userId: String(userId)
                }
            },

            success_url:
                `${process.env.FRONTEND_URL}/?success=true&session_id={CHECKOUT_SESSION_ID}`,

            cancel_url:
                `${process.env.FRONTEND_URL}/?canceled=true`
        });

        res.json({
            url: session.url,
            sessionId: session.id
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Subscription checkout failed"
        });
    }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
