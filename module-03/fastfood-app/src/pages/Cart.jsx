import { useState } from "react";
import { useCart } from "../contextapi/CartContext";
import EmptyCart from "../components/cart/EmptyCart";
import CartItemList from "../components/cart/CartItemList";
import OrderSummary from "../components/cart/OrderSummary";
import CheckoutModal from "../components/cart/CheckoutModal";
import OrderConfirmationModal from "../components/cart/OrderConfirmationModal";

function Cart() {
    const {
        cartItems,
        cartCount,
        totalCartPrice,
        updateQuantity,
        removeCartItem,
        clearCart,
        showToast,
    } = useCart();

    const [couponCode, setCouponCode] = useState("");
    const [appliedDiscount, setAppliedDiscount] = useState(null);
    const [couponError, setCouponError] = useState("");

    // Checkout modal states
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);

    // Form inputs
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [notes, setNotes] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("cod");

    // Calculate delivery and totals
    const isFreeDeliveryQualified = totalCartPrice >= 1500 || appliedDiscount?.type === "free_delivery";
    const standardDeliveryFee = isFreeDeliveryQualified ? 0 : 150;
    const taxRate = 0.05; // 5% GST
    const taxAmount = Math.round(totalCartPrice * taxRate);

    let discountAmount = 0;
    if (appliedDiscount) {
        if (appliedDiscount.type === "percentage") {
            discountAmount = Math.round((totalCartPrice * appliedDiscount.value) / 100);
        } else if (appliedDiscount.type === "fixed") {
            discountAmount = Math.min(totalCartPrice, appliedDiscount.value);
        }
    }

    const finalTotal = Math.max(0, totalCartPrice - discountAmount + standardDeliveryFee + taxAmount);

    const handleApplyCoupon = (e) => {
        e.preventDefault();
        setCouponError("");
        const code = couponCode.trim().toUpperCase();

        if (!code) return;

        if (code === "FLAME20") {
            setAppliedDiscount({ code: "FLAME20", type: "percentage", value: 20, description: "20% Weekend Discount" });
            showToast("Promo FLAME20 applied! 20% discount added.", "success");
        } else if (code === "FREEDEL") {
            setAppliedDiscount({ code: "FREEDEL", type: "free_delivery", value: 150, description: "Free Delivery Claimed" });
            showToast("Promo FREEDEL applied! Delivery fee waived.", "success");
        } else if (code === "BITE100") {
            setAppliedDiscount({ code: "BITE100", type: "fixed", value: 100, description: "Rs. 100 Flat Voucher" });
            showToast("Promo BITE100 applied! Rs. 100 off your order.", "success");
        } else {
            setCouponError("Invalid promo code. Try FLAME20, FREEDEL, or BITE100.");
        }
    };

    const handleRemoveCoupon = () => {
        setAppliedDiscount(null);
        setCouponCode("");
        setCouponError("");
        showToast("Coupon removed", "info");
    };

    const handleSelectCouponPill = (code) => {
        setCouponCode(code);
    };

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        if (!fullName.trim() || !phone.trim() || !address.trim()) {
            showToast("Please fill in all delivery details", "info");
            return;
        }

        const generatedOrder = {
            orderId: `FB-${Math.floor(100000 + Math.random() * 900000)}`,
            customerName: fullName,
            phone,
            address,
            notes,
            paymentMethod,
            items: [...cartItems],
            totalAmount: finalTotal,
            placedAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            deliveryEstimate: "25 - 35 minutes",
        };

        setOrderDetails(generatedOrder);
        setOrderPlaced(true);
        setIsCheckoutOpen(false);
        clearCart();
    };

    // 1. Empty cart view
    if (cartItems.length === 0 && !orderPlaced) {
        return <EmptyCart />;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            {/* Title Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
                        Your Order Cart
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Review your items, customize quantities, and apply special discount vouchers.
                    </p>
                </div>
                {cartItems.length > 0 && (
                    <button
                        onClick={clearCart}
                        className="text-xs text-red-500 hover:text-red-700 font-bold self-start sm:self-auto hover:underline cursor-pointer"
                    >
                        🗑️ Clear Cart ({cartCount})
                    </button>
                )}
            </div>

            {/* Main Cart Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8">
                    <CartItemList
                        items={cartItems}
                        onUpdateQuantity={updateQuantity}
                        onRemove={removeCartItem}
                        onSelectCoupon={handleSelectCouponPill}
                    />
                </div>

                <div className="lg:col-span-4">
                    <OrderSummary
                        totalCartPrice={totalCartPrice}
                        couponCode={couponCode}
                        setCouponCode={setCouponCode}
                        appliedDiscount={appliedDiscount}
                        couponError={couponError}
                        onApplyCoupon={handleApplyCoupon}
                        onRemoveCoupon={handleRemoveCoupon}
                        discountAmount={discountAmount}
                        isFreeDeliveryQualified={isFreeDeliveryQualified}
                        standardDeliveryFee={standardDeliveryFee}
                        taxAmount={taxAmount}
                        finalTotal={finalTotal}
                        onOpenCheckout={() => setIsCheckoutOpen(true)}
                    />
                </div>
            </div>

            {/* Checkout Form Modal */}
            <CheckoutModal
                isOpen={isCheckoutOpen}
                onClose={() => setIsCheckoutOpen(false)}
                onSubmit={handlePlaceOrder}
                fullName={fullName}
                setFullName={setFullName}
                phone={phone}
                setPhone={setPhone}
                address={address}
                setAddress={setAddress}
                notes={notes}
                setNotes={setNotes}
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                finalTotal={finalTotal}
            />

            {/* Order Confirmation Modal */}
            <OrderConfirmationModal
                isOpen={orderPlaced}
                orderDetails={orderDetails}
                onClose={() => setOrderPlaced(false)}
            />
        </div>
    );
}

export default Cart;