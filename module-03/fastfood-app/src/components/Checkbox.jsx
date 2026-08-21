function Checkbox({ category, selectedCategories, onChangeCategory }) {
    const isChecked = selectedCategories.includes(category);

    const getCategoryIcon = (cat) => {
        switch (cat.toLowerCase()) {
            case "burger":
                return "🍔";
            case "shawarma":
                return "🌯";
            case "pizza":
                return "🍕";
            default:
                return "🍴";
        }
    };

    return (
        <label
            className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all border ${
                isChecked
                    ? "bg-orange-50/80 border-orange-300 text-orange-950 font-semibold shadow-xs"
                    : "bg-white border-transparent hover:bg-gray-50 text-gray-700 font-medium"
            }`}
        >
            <div className="flex items-center gap-3">
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => onChangeCategory(category, e.target.checked)}
                    className="w-4 h-4 text-orange-500 rounded border-gray-300 focus:ring-orange-400 cursor-pointer accent-orange-500"
                />
                <span className="text-sm flex items-center gap-2">
                    <span className="text-base">{getCategoryIcon(category)}</span>
                    <span>{category}</span>
                </span>
            </div>
            <span
                className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                    isChecked ? "bg-orange-200 text-orange-900" : "bg-gray-100 text-gray-500"
                }`}
            >
                3
            </span>
        </label>
    );
}

export default Checkbox;