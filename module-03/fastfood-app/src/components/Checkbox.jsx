

function Checkbox({ category, selectedCategories, onChangeCategory }) {

    return (
        <div className="flex gap-3">
            <input type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={(e) => onChangeCategory(category, e.target.checked)} />
            <h3>{category}</h3>
        </div>
    )
}

export default Checkbox;