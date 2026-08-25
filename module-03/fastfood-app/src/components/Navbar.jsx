import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../contextapi/CartContext";
import RoleBadge from "./auth/RoleBadge";

export default function Navbar() {
    const { cartCount, totalCartPrice } = useCart();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-orange-100 shadow-xs transition-all">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Brand Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-red-500 flex items-center justify-center shadow-md shadow-orange-500/25 group-hover:scale-105 transition-transform">
                            <span className="text-2xl">🔥</span>
                        </div>
                        <div>
                            <span className="text-2xl font-black tracking-tight text-gray-900">
                                Flame<span className="text-orange-500">Bite</span>
                            </span>
                            <span className="hidden sm:block text-[10px] uppercase font-bold tracking-widest text-amber-600">
                                Fast • Fresh • Hot
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `text-sm font-semibold transition-colors duration-150 ${
                                    isActive
                                        ? "text-orange-600 font-bold border-b-2 border-orange-500 pb-1"
                                        : "text-gray-600 hover:text-orange-500"
                                }`
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/collection"
                            className={({ isActive }) =>
                                `text-sm font-semibold transition-colors duration-150 ${
                                    isActive
                                        ? "text-orange-600 font-bold border-b-2 border-orange-500 pb-1"
                                        : "text-gray-600 hover:text-orange-500"
                                }`
                            }
                        >
                            Explore Menu
                        </NavLink>
                        <a
                            href="#deals"
                            className="text-sm font-semibold text-gray-600 hover:text-orange-500 transition-colors duration-150 flex items-center gap-1.5"
                        >
                            <span className="bg-red-100 text-red-600 text-[11px] font-extrabold px-1.5 py-0.5 rounded-full">
                                HOT
                            </span>
                            Deals & Combos
                        </a>
                    </nav>

                    {/* Right Actions */}
                    <div className="flex items-center gap-4">
                        <Link
                            to="/collection"
                            className="hidden lg:flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3.5 py-2 rounded-xl text-xs font-medium transition"
                        >
                            <svg
                                className="w-4 h-4 text-gray-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                            <span>Search food...</span>
                        </Link>

                        {/* RBAC Role & User Profile Badge */}
                        <RoleBadge />

                        {/* POS / Admin Dashboard Link */}
                        <Link
                            to="/dashboard"
                            className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-xs transition hover:scale-105 active:scale-95 cursor-pointer"
                        >
                            <span>⚡ POS / Admin</span>
                        </Link>

                        {/* Cart Button */}
                        <Link
                            to="/cart"
                            className="relative flex items-center gap-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-4 py-2.5 rounded-xl font-bold text-sm shadow-md shadow-orange-500/20 active:scale-95 transition-all"
                        >
                            <div className="relative">
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                    />
                                </svg>
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-black rounded-full w-5 h-5 flex items-center justify-center ring-2 ring-white animate-bounce">
                                        {cartCount}
                                    </span>
                                )}
                            </div>
                            <span className="hidden sm:inline">
                                {totalCartPrice > 0 ? `Rs. ${totalCartPrice.toLocaleString()}` : "Cart"}
                            </span>
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition"
                            aria-label="Toggle Navigation"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                {mobileMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t border-orange-100 bg-white px-4 pt-3 pb-5 space-y-2 shadow-xl animate-fadeIn">
                    <Link
                        to="/"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-2 rounded-lg text-base font-semibold text-gray-800 hover:bg-orange-50 hover:text-orange-600"
                    >
                        Home
                    </Link>
                    <Link
                        to="/collection"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-2 rounded-lg text-base font-semibold text-gray-800 hover:bg-orange-50 hover:text-orange-600"
                    >
                        Explore Menu
                    </Link>
                    <Link
                        to="/cart"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-2 rounded-lg text-base font-semibold text-gray-800 hover:bg-orange-50 hover:text-orange-600"
                    >
                        Cart ({cartCount} items)
                    </Link>
                </div>
            )}
        </header>
    );
}
