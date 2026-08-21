import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Collection from "../pages/Collection";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Toast from "../components/Toast";

function MainRouter() {
    return (
        <div className="min-h-screen flex flex-col bg-stone-50/50 text-gray-900 font-sans selection:bg-orange-500 selection:text-white">
            <Navbar />
            <div className="flex-1">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/collection" element={<Collection />} />
                    <Route path="/collection/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    {/* Fallback */}
                    <Route path="*" element={<Home />} />
                </Routes>
            </div>
            <Footer />
            <Toast />
        </div>
    );
}

export default MainRouter;