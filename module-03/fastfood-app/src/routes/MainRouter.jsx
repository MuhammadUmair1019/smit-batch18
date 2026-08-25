import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Collection from "../pages/Collection";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Toast from "../components/Toast";
import ProtectedRoute from "../components/auth/ProtectedRoute";

// Dashboard Pages & Layout
import DashboardLayout from "../components/dashboard/DashboardLayout";
import DashboardOverview from "../pages/dashboard/DashboardOverview";
import PosTerminal from "../pages/dashboard/PosTerminal";
import OrdersManager from "../pages/dashboard/OrdersManager";
import MenuManager from "../pages/dashboard/MenuManager";

function CustomerLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-stone-50/50 text-gray-900 font-sans selection:bg-orange-500 selection:text-white">
            <Navbar />
            <div className="flex-1">{children}</div>
            <Footer />
            <Toast />
        </div>
    );
}

function MainRouter() {
    return (
        <Routes>
            {/* 1. Customer Storefront Routes */}
            <Route
                path="/"
                element={
                    <CustomerLayout>
                        <Home />
                    </CustomerLayout>
                }
            />
            <Route
                path="/collection"
                element={
                    <CustomerLayout>
                        <Collection />
                    </CustomerLayout>
                }
            />
            <Route
                path="/collection/:id"
                element={
                    <CustomerLayout>
                        <ProductDetail />
                    </CustomerLayout>
                }
            />
            <Route
                path="/cart"
                element={
                    <CustomerLayout>
                        <Cart />
                    </CustomerLayout>
                }
            />

            {/* 2. Standalone Fullscreen POS Terminal (Restricted to Admin & Cashier) */}
            <Route
                path="/dashboard/pos"
                element={
                    <ProtectedRoute allowedRoles={["admin", "cashier"]}>
                        <PosTerminal />
                        <Toast />
                    </ProtectedRoute>
                }
            />

            {/* 3. Dashboard Shell Routes (Restricted to Staff Roles) */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute allowedRoles={["admin", "cashier", "kitchen", "delivery"]}>
                        <DashboardLayout />
                        <Toast />
                    </ProtectedRoute>
                }
            >
                <Route index element={<DashboardOverview />} />
                <Route path="orders" element={<OrdersManager />} />
                <Route
                    path="menu"
                    element={
                        <ProtectedRoute allowedRoles={["admin"]}>
                            <MenuManager />
                        </ProtectedRoute>
                    }
                />
            </Route>

            {/* Fallback */}
            <Route
                path="*"
                element={
                    <CustomerLayout>
                        <Home />
                    </CustomerLayout>
                }
            />
        </Routes>
    );
}

export default MainRouter;