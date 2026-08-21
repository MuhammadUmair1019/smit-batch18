import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Collection from "../pages/Collection";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Toast from "../components/Toast";

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

            {/* 2. Standalone Fullscreen POS Terminal */}
            <Route
                path="/dashboard/pos"
                element={
                    <>
                        <PosTerminal />
                        <Toast />
                    </>
                }
            />

            {/* 3. Dashboard Shell Routes */}
            <Route
                path="/dashboard"
                element={
                    <>
                        <DashboardLayout />
                        <Toast />
                    </>
                }
            >
                <Route index element={<DashboardOverview />} />
                <Route path="orders" element={<OrdersManager />} />
                <Route path="menu" element={<MenuManager />} />
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