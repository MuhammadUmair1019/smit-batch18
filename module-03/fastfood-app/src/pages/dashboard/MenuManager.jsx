import { useState, useMemo } from "react";
import { useRestaurant } from "../../contextapi/RestaurantContext";
import { useCart } from "../../contextapi/CartContext";

const sampleImages = [
    { label: "Classic Burger", url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80" },
    { label: "Crispy Zinger", url: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80" },
    { label: "Chicken Shawarma", url: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800&q=80" },
    { label: "Arabic Shawarma", url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80" },
    { label: "Pepperoni Pizza", url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80" },
    { label: "Fajita Pizza", url: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=800&q=80" },
];

export default function MenuManager() {
    const { menuItems, addMenuItem, updateMenuItem, deleteMenuItem } = useRestaurant();
    const { showToast } = useCart();

    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    // Form inputs
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("Burger");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(sampleImages[0].url);
    const [description, setDescription] = useState("");
    const [rating, setRating] = useState(5.0);

    const filteredItems = useMemo(() => {
        return menuItems.filter((item) => {
            const matchesCat =
                selectedCategory === "All" || item.category.toLowerCase() === selectedCategory.toLowerCase();
            const matchesSearch =
                item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCat && matchesSearch;
        });
    }, [menuItems, selectedCategory, searchQuery]);

    const handleOpenAddModal = () => {
        setEditingItem(null);
        setTitle("");
        setCategory("Burger");
        setPrice("");
        setImage(sampleImages[0].url);
        setDescription("");
        setRating(5.0);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (item) => {
        setEditingItem(item);
        setTitle(item.title);
        setCategory(item.category);
        setPrice(item.price.toString());
        setImage(item.image);
        setDescription(item.description);
        setRating(item.rating || 5.0);
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !price || !description.trim()) {
            showToast("Please complete all required fields", "info");
            return;
        }

        const payload = {
            title: title.trim(),
            category,
            price: Number(price),
            image: image.trim() || sampleImages[0].url,
            description: description.trim(),
            rating: Number(rating),
        };

        if (editingItem) {
            updateMenuItem({ ...payload, id: editingItem.id });
            showToast(`Updated "${title}" successfully!`, "success");
        } else {
            addMenuItem(payload);
            showToast(`Added new dish "${title}" to menu!`, "success");
        }

        setIsModalOpen(false);
    };

    const handleDelete = (id, itemTitle) => {
        if (window.confirm(`Are you sure you want to remove "${itemTitle}" from the menu?`)) {
            deleteMenuItem(id);
            showToast(`Removed "${itemTitle}" from menu`, "info");
        }
    };

    return (
        <div className="space-y-6">
            {/* Header Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight">
                        Menu & Inventory Management
                    </h1>
                    <p className="text-xs text-gray-500 mt-0.5">
                        Add new food dishes, edit prices, and manage live availability on the customer website and POS.
                    </p>
                </div>
                <button
                    type="button"
                    onClick={handleOpenAddModal}
                    className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-md shadow-orange-500/20 flex items-center justify-center gap-2 cursor-pointer transition active:scale-95"
                >
                    <span>➕ Add New Dish</span>
                </button>
            </div>

            {/* Filters Bar */}
            <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none text-xs">
                    {["All", "Burger", "Shawarma", "Pizza"].map((cat) => (
                        <button
                            key={cat}
                            type="button"
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-3 py-1.5 rounded-xl font-bold transition whitespace-nowrap cursor-pointer ${
                                selectedCategory === cat
                                    ? "bg-slate-900 text-white shadow-xs"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="relative">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search menu item..."
                        className="bg-gray-50 border border-gray-200 text-xs rounded-xl px-3 py-2 w-full sm:w-60 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                </div>
            </div>

            {/* Menu Items Table / Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white rounded-3xl border border-gray-200 p-4 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition"
                    >
                        <div className="flex gap-4">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-24 h-24 object-cover rounded-2xl bg-gray-100 border border-gray-100 shrink-0"
                            />
                            <div className="space-y-1 flex-1">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold uppercase tracking-wider bg-orange-50 text-orange-700 px-2 py-0.5 rounded-md border border-orange-200">
                                        {item.category}
                                    </span>
                                    <span className="text-xs font-bold text-amber-500">
                                        ★ {item.rating ? item.rating.toFixed(1) : "5.0"}
                                    </span>
                                </div>
                                <h3 className="font-bold text-gray-900 text-sm line-clamp-1">
                                    {item.title}
                                </h3>
                                <p className="text-[11px] text-gray-500 line-clamp-2">
                                    {item.description}
                                </p>
                                <div className="text-base font-black text-gray-900 pt-1">
                                    Rs. {item.price.toLocaleString()}
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-2">
                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                                ● In Stock & Live
                            </span>
                            <div className="flex items-center gap-1.5">
                                <button
                                    type="button"
                                    onClick={() => handleOpenEditModal(item)}
                                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold px-3 py-1.5 rounded-xl transition cursor-pointer"
                                >
                                    ✏️ Edit
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleDelete(item.id, item.title)}
                                    className="bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold px-3 py-1.5 rounded-xl transition cursor-pointer"
                                >
                                    🗑️ Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ADD / EDIT MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
                    <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                            <h2 className="text-xl font-black text-gray-900">
                                {editingItem ? "Edit Menu Dish" : "Add New Menu Dish"}
                            </h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center font-bold cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                            <div>
                                <label className="block font-bold text-gray-700 mb-1">
                                    Dish Title <span className="text-orange-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g. Smoky BBQ Beef Burger"
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block font-bold text-gray-700 mb-1">Category</label>
                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400 cursor-pointer"
                                    >
                                        <option value="Burger">Burger</option>
                                        <option value="Shawarma">Shawarma</option>
                                        <option value="Pizza">Pizza</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block font-bold text-gray-700 mb-1">
                                        Price in PKR (Rs.) <span className="text-orange-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        required
                                        min="1"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        placeholder="e.g. 799"
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block font-bold text-gray-700 mb-1">Image URL</label>
                                <input
                                    type="url"
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                    placeholder="https://images.unsplash.com/..."
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                                />
                                <div className="flex gap-1.5 pt-1.5 overflow-x-auto">
                                    <span className="text-[10px] text-gray-400 font-bold self-center">Presets:</span>
                                    {sampleImages.map((s, idx) => (
                                        <button
                                            key={idx}
                                            type="button"
                                            onClick={() => setImage(s.url)}
                                            className="text-[10px] bg-gray-100 hover:bg-gray-200 text-gray-600 px-2 py-0.5 rounded-md font-semibold whitespace-nowrap cursor-pointer"
                                        >
                                            {s.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block font-bold text-gray-700 mb-1">
                                    Description <span className="text-orange-500">*</span>
                                </label>
                                <textarea
                                    required
                                    rows="2"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Describe delicious ingredients, cheese, sauces..."
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-sm py-3.5 rounded-xl shadow-lg shadow-orange-500/20 transition active:scale-95 cursor-pointer"
                            >
                                {editingItem ? "Save Dish Updates" : "Publish New Dish to Menu"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
