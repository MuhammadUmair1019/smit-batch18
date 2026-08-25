import { useState, useEffect, useMemo } from "react";
import {
    collection,
    onSnapshot,
    doc,
    setDoc,
    updateDoc,
    deleteDoc,
    serverTimestamp,
    query,
    orderBy,
} from "firebase/firestore";
import { db } from "../firebase/config";
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
];

export default function RestaurantProvider({ children }) {
    // 1. Menu Items State (Syncs with Firestore 'menu' collection)
    const [menuItems, setMenuItems] = useState(() => {
        try {
            const saved = localStorage.getItem("flamebite_menu");
            return saved ? JSON.parse(saved) : initialProducts;
        } catch {
            return initialProducts;
        }
    });

    // 2. Orders State (Syncs with Firestore 'orders' collection)
    const [orders, setOrders] = useState(() => {
        try {
            const saved = localStorage.getItem("flamebite_orders");
            return saved ? JSON.parse(saved) : sampleInitialOrders;
        } catch {
            return sampleInitialOrders;
        }
    });

    const [isLiveFirestore, setIsLiveFirestore] = useState(false);

    // Real-time Firestore Listener for Menu Collection
    useEffect(() => {
        let unsubscribe;
        try {
            const menuCol = collection(db, "menu");
            unsubscribe = onSnapshot(
                menuCol,
                (snapshot) => {
                    if (!snapshot.empty) {
                        const items = snapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }));
                        setMenuItems(items);
                        setIsLiveFirestore(true);
                        localStorage.setItem("flamebite_menu", JSON.stringify(items));
                    }
                },
                (err) => {
                    console.warn("Firestore menu live listener fallback:", err.message);
                }
            );
        } catch (err) {
            console.warn("Menu Firestore init error:", err.message);
        }

        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, []);

    // Real-time Firestore Listener for Orders Collection
    useEffect(() => {
        let unsubscribe;
        try {
            const ordersQuery = query(collection(db, "orders"), orderBy("createdAt", "desc"));
            unsubscribe = onSnapshot(
                ordersQuery,
                (snapshot) => {
                    if (!snapshot.empty) {
                        const liveOrders = snapshot.docs.map((doc) => ({
                            orderId: doc.id,
                            ...doc.data(),
                        }));
                        setOrders(liveOrders);
                        setIsLiveFirestore(true);
                        localStorage.setItem("flamebite_orders", JSON.stringify(liveOrders));
                    }
                },
                (err) => {
                    console.warn("Firestore orders live listener fallback:", err.message);
                }
            );
        } catch (err) {
            console.warn("Orders Firestore init error:", err.message);
        }

        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, []);

    // LocalStorage fallback sync
    useEffect(() => {
        try {
            localStorage.setItem("flamebite_menu", JSON.stringify(menuItems));
        } catch (err) {
            console.error("Failed saving menu to localStorage", err);
        }
    }, [menuItems]);

    useEffect(() => {
        try {
            localStorage.setItem("flamebite_orders", JSON.stringify(orders));
        } catch (err) {
            console.error("Failed saving orders to localStorage", err);
        }
    }, [orders]);

    // Create Order in Firestore & Local State
    const createOrder = async (orderData) => {
        const orderId = orderData.orderId || `FB-${Math.floor(100000 + Math.random() * 900000)}`;
        const newOrder = {
            orderId,
            customerName: orderData.customerName || "Walk-in Customer",
            customerUid: orderData.customerUid || null,
            phone: orderData.phone || "N/A",
            address: orderData.address || "Dine-in / Counter",
            orderType: orderData.orderType || "takeaway",
            tableNo: orderData.tableNo || null,
            source: orderData.source || "pos", // 'pos' or 'online'
            status: orderData.status || "in_kitchen",
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

        // Update local state immediately for instant UX
        setOrders((prev) => [newOrder, ...prev]);

        // Attempt Firestore write
        try {
            await setDoc(doc(db, "orders", orderId), {
                ...newOrder,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            });
        } catch (err) {
            console.warn("Could not write order to Firestore (stored locally):", err.message);
        }

        return newOrder;
    };

    // Update Order Status in Firestore & Local State
    const updateOrderStatus = async (orderId, newStatus) => {
        setOrders((prev) =>
            prev.map((o) => (o.orderId === orderId ? { ...o, status: newStatus } : o))
        );

        try {
            await updateDoc(doc(db, "orders", orderId), {
                status: newStatus,
                updatedAt: serverTimestamp(),
            });
        } catch (err) {
            console.warn("Could not update order status in Firestore:", err.message);
        }
    };

    // Cancel Order
    const cancelOrder = async (orderId) => {
        await updateOrderStatus(orderId, "cancelled");
    };

    // Menu CRUD Actions in Firestore & Local State
    const addMenuItem = async (item) => {
        const id = item.id ? item.id.toString() : Date.now().toString();
        const newItem = {
            ...item,
            id,
            rating: item.rating || 5.0,
            isAvailable: true,
        };

        setMenuItems((prev) => [newItem, ...prev]);

        try {
            await setDoc(doc(db, "menu", id), {
                ...newItem,
                updatedAt: serverTimestamp(),
            });
        } catch (err) {
            console.warn("Could not add menu item to Firestore (stored locally):", err.message);
        }
    };

    const updateMenuItem = async (updatedItem) => {
        const id = updatedItem.id.toString();
        setMenuItems((prev) =>
            prev.map((item) => (item.id.toString() === id ? updatedItem : item))
        );

        try {
            await setDoc(
                doc(db, "menu", id),
                {
                    ...updatedItem,
                    updatedAt: serverTimestamp(),
                },
                { merge: true }
            );
        } catch (err) {
            console.warn("Could not update menu item in Firestore:", err.message);
        }
    };

    const deleteMenuItem = async (id) => {
        const strId = id.toString();
        setMenuItems((prev) => prev.filter((item) => item.id.toString() !== strId));

        try {
            await deleteDoc(doc(db, "menu", strId));
        } catch (err) {
            console.warn("Could not delete menu item from Firestore:", err.message);
        }
    };

    // Analytics computation
    const analytics = useMemo(() => {
        const validOrders = orders.filter((o) => o.status !== "cancelled");
        const totalRevenue = validOrders.reduce((sum, o) => sum + (Number(o.totalAmount) || 0), 0);
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
            o.items?.forEach((it) => {
                if (!itemFrequency[it.title]) {
                    itemFrequency[it.title] = { count: 0, revenue: 0, title: it.title, price: it.price };
                }
                itemFrequency[it.title].count += Number(it.quantity) || 1;
                itemFrequency[it.title].revenue += (Number(it.price) || 0) * (Number(it.quantity) || 1);
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
                isLiveFirestore,
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
