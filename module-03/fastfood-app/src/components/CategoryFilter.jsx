import { categoryTitle } from "../data/category";
import Checkbox from "./Checkbox";

function CategoryFilter({ selectedCategories, onChangeCategoryHandler }) {
    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">
                    Food Categories
                </h3>
                {selectedCategories.length > 0 && (
                    <span className="text-xs bg-orange-100 text-orange-700 font-bold px-2 py-0.5 rounded-full">
                        {selectedCategories.length} selected
                    </span>
                )}
            </div>
            <div className="space-y-1">
                {categoryTitle.map((category) => (
                    <Checkbox
                        key={category}
                        category={category}
                        selectedCategories={selectedCategories}
                        onChangeCategory={onChangeCategoryHandler}
                    />
                ))}
            </div>
        </div>
    );
}

export default CategoryFilter;