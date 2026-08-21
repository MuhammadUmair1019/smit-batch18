export default function DrinkSelector({
    drinks,
    selectedDrink,
    onSelectDrink,
}) {
    return (
        <div className="space-y-3 pt-4 border-t border-gray-100">
            <label className="block text-sm font-black uppercase tracking-wider text-gray-900">
                Select Paired Drink <span className="text-orange-500">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {drinks.map((drink) => {
                    const isSelected = selectedDrink.id === drink.id;
                    return (
                        <button
                            key={drink.id}
                            type="button"
                            onClick={() => onSelectDrink(drink)}
                            className={`flex items-center gap-2 p-3 rounded-2xl border text-left cursor-pointer transition-all ${
                                isSelected
                                    ? "border-orange-500 bg-orange-50/80 text-orange-950 font-bold shadow-xs scale-102 ring-1 ring-orange-500"
                                    : "border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-medium"
                            }`}
                        >
                            <span className="text-lg">{drink.icon}</span>
                            <span className="text-xs sm:text-sm">{drink.name}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
