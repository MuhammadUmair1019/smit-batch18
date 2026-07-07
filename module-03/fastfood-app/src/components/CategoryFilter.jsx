import { categoryTitle } from "../data/category";
import Checkbox from "./Checkbox";

function CategoryFilter({ selectedCategories, onChangeCategoryHandler }) {

    return (
        <div>
            <h3 className="text-2xl font-semibold mb-2">Category Filter</h3>
            {categoryTitle.map(category => (
                <Checkbox
                    key={category}
                    category={category}
                    selectedCategories={selectedCategories}
                    onChangeCategory={onChangeCategoryHandler}
                />
            ))
            }
        </div>
    )
}

export default CategoryFilter;