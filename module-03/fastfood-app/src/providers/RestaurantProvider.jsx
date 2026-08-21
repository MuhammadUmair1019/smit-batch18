import { useState, useEffect, useMemo } from "react";
import { RestaurantContext } from "../contextapi/RestaurantContext";
import { products as initialProducts } from "../data/products";

const sampleInitialOrders = [
    {
        orderId: "FB-90214",
        customerName: "Zainab Tariq",
        phone: "0321-4567890",
        address: "Table 4 (Dine-in)",
        orderType: "dine-in",
        tableNo: "4",
        source: "pos",
        status: "in_kitchen",
        paymentMethod: "cash",
        paymentStatus: "paid",
        notes: "Extra napkins and garlic mayo",
        placedAt: "14:15",
        items: [
            { id: 1, title: "Classic Beef Burger", price: 749, quantity: 2, drink: "Coca Cola" },
            { id: 5, title: "Pepperoni Pizza", price: 1399, quantity: 1, drink: "Sprite" },
        ],
        subtotal: 2897,
        discount: 0,
        tax: 145,
        deliveryFee: 0,
        totalAmount: 3042,
        cashTendered: 3500,
        changeDue: 458,
    },
    {
        orderId: "FB-90215",
        customerName: "Hamza Farooq",
        phone: "0300-9876543",
        address: "House 42, St 5, Phase 6, DHA",
        orderType: "delivery",
        tableNo: null,
        source: "online",
        status: "pending",
        paymentMethod: "cod",
        paymentStatus: "unpaid",
        notes: "Don't ring bell, baby is sleeping",
        placedAt: "14:35",
        items: [
            { id: 2, title: "Crispy Zinger Burger", price: 699, quantity: 2, drink: "Pepsi" },
            { id: 4, title: "Arabic Shawarma", price: 699, quantity: 1, drink: "Mineral Water" },
        ],
        subtotal: 2097,
        discount: 200,
        tax: 105,
        deliveryFee: 150,
        totalAmount: 2152,
        cashTendered: 0,
        changeDue: 0,
    },
    {
        orderId: "FB-90212",
        customerName: "Bilal Sheikh",
        phone: "0333-1122334",
        address: "Counter (Takeaway)",
        orderType: "takeaway",
        tableNo: null,
        source: "pos",
        status: "ready",
        paymentMethod: "card",
        paymentStatus: "paid",
        notes: "Pack sauce separately",
        placedAt: "14:02",
        items: [
            { id: 7, title: "BBQ Smash Burger", price: 899, quantity: 1, drink: "Coca Cola" },
            { id: 8, title: "Beef Shawarma", price: 599, quantity: 2, drink: "Orange Juice" },
        ],
        subtotal: 2097,
        discount: 0,
        tax: 105,
        deliveryFee: 0,
        totalAmount: 2202,
        cashTendered: 2202,
        changeDue: 0,
    },
    {
        orderId: "FB-90209",
        customerName: "Ayesha Malik",
        phone: "0345-5566778",
        address: "Sector Y, Phase 3, DHA",
        orderType: "delivery",
        tableNo: null,
        source: "online",
        status: "completed",
        paymentMethod: "card",
        paymentStatus: "paid",
        notes: "",
        placedAt: "13:10",
        items: [
            { id: 6, title: "Chicken Fajita Pizza", price: 1499, quantity: 1, drink: "Coca Cola" },
        ],
        subtotal: 1499,
        discount: 0,
        tax: 75,
        deliveryFee: 0,
        totalAmount: 1574,
        cashTendered: 1574,
        changeDue: 0,
    },
];

export default function RestaurantProvider({ children }) {
    // 1. Centralized Menu items (with persistence)
    const [menuItems, setMenuItems] = useState(() => {
        try {
            const saved = localStorage.getItem("flamebite_menu");
            return saved ? JSON.parse(saved) : initialProducts;
        } catch {
            return initialProducts;
        }
    });

    // 2. Centralized Orders (with persistence)
    const [orders, setOrders] = useState(() => {
        try {
            const saved = localStorage.getItem("flamebite_orders");
            return saved ? JSON.parse(saved) : sampleInitialOrders;
        } catch {
            return sampleInitialOrders;
        }
    });

    // Sync menu items
    useEffect(() => {
        try {
            localStorage.setItem("flamebite_menu", JSON.stringify(menuItems));
        } catch (err) {
            console.error("Failed saving menu", err);
        }
    }, [menuItems]);

    // Sync orders
    useEffect(() => {
        try {
            localStorage.setItem("flamebite_orders", JSON.stringify(orders));
        } catch (err) {
            console.error("Failed saving orders", err);
        }
    }, [orders]);

    // Create Order (called by online checkout & POS register)
    const createOrder = (orderData) => {
        const newOrder = {
            orderId: orderData.orderId || `FB-${Math.floor(100000 + Math.random() * 900000)}`,
            customerName: orderData.customerName || "Walk-in Customer",
            phone: orderData.phone || "N/A",
            address: orderData.address || "Dine-in / Counter",
            orderType: orderData.orderType || "takeaway",
            tableNo: orderData.tableNo || null,
            source: orderData.source || "pos", // 'pos' or 'online'
            status: orderData.status || "in_kitchen", // 'pending', 'in_kitchen', 'ready', 'completed', 'cancelled'
            paymentMethod: orderData.paymentMethod || "cash",
            paymentStatus: orderData.paymentStatus || "paid",
            notes: orderData.notes || "",
            placedAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            items: orderData.items || [],
            subtotal: orderData.subtotal || 0,
            discount: orderData.discount || 0,
            tax: orderData.tax || 0,
            deliveryFee: orderData.deliveryFee || 0,
            totalAmount: orderData.totalAmount || 0,
            cashTendered: orderData.cashTendered || 0,
            changeDue: orderData.changeDue || 0,
        };

        setOrders((prev) => [newOrder, ...prev]);
        return newOrder;
    };

    // Update Order Status
    const updateOrderStatus = (orderId, newStatus) => {
        setOrders((prev) =>
            prev.map((o) => (o.orderId === orderId ? { ...o, status: newStatus } : o))
        );
    };

    // Delete / Cancel Order
    const cancelOrder = (orderId) => {
        updateOrderStatus(orderId, "cancelled");
    };

    // Menu CRUD Actions
    const addMenuItem = (item) => {
        const newItem = {
            ...item,
            id: Date.now(),
            rating: item.rating || 5.0,
        };
        setMenuItems((prev) => [newItem, ...prev]);
    };

    const updateMenuItem = (updatedItem) => {
        setMenuItems((prev) =>
            prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
        );
    };

    const deleteMenuItem = (id) => {
        setMenuItems((prev) => prev.filter((item) => item.id !== id));
    };

    // Analytics computation
    const analytics = useMemo(() => {
        const validOrders = orders.filter((o) => o.status !== "cancelled");
        const totalRevenue = validOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
        const totalOrders = validOrders.length;
        const activeKitchenOrders = orders.filter(
            (o) => o.status === "in_kitchen" || o.status === "pending"
        ).length;
        const posOrdersCount = validOrders.filter((o) => o.source === "pos").length;
        const onlineOrdersCount = validOrders.filter((o) => o.source === "online").length;
        const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

        // Calculate item popularity
        const itemFrequency = {};
        validOrders.forEach((o) => {
            o.items.forEach((it) => {
                if (!itemFrequency[it.title]) {
                    itemFrequency[it.title] = { count: 0, revenue: 0, title: it.title, price: it.price };
                }
                itemFrequency[it.title].count += it.quantity;
                itemFrequency[it.title].revenue += it.price * it.quantity;
            });
        });

        const topSellingItems = Object.values(itemFrequency)
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);

        return {
            totalRevenue,
            totalOrders,
            activeKitchenOrders,
            posOrdersCount,
            onlineOrdersCount,
            avgOrderValue,
            topSellingItems,
        };
    }, [orders]);

    return (
        <RestaurantContext.Provider
            value={{
                menuItems,
                orders,
                createOrder,
                updateOrderStatus,
                cancelOrder,
                addMenuItem,
                updateMenuItem,
                deleteMenuItem,
                analytics,
            }}
        >
            {children}
        </RestaurantContext.Provider>
    );
}
