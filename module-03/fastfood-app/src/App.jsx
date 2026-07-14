import { useState } from "react";
import ProductListing from "./components/ProductListing";
import CategoryFilter from "./components/CategoryFilter";
import RatingFilter from "./components/RatingFilter";

import { getVisibleProducts } from "./data/product-filter";
import { priceRange } from "./data/products";


const initPriceFilter = {
  min: priceRange.min,
  max: priceRange.max,
  isApplied: false,
};


function App() {
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedRating, setSelectedRating] = useState("")

  const [selectedPrice, setSelectedPrice] = useState(initPriceFilter);

  // console.log(selectedCategories)
  // console.log(selectedPrice)


  const onChangeCategoryHandler = (category, isChecked) => {
    if (isChecked) {
      setSelectedCategories([...selectedCategories, category])
    } else {
      setSelectedCategories(selectedCategories.filter(c => c !== category))
    }

  }

  const onChangeRatingHandler = (rating) => {
    setSelectedRating(rating)
  }

  const clearAll = () => {
    setSelectedCategories([])
    setSelectedRating("")
    setSelectedPrice(initPriceFilter)
  }

  const products = getVisibleProducts(selectedCategories, selectedRating, selectedPrice)



  return (
    <div className="grid grid-cols-12 gap-2">

      {/* filters  */}
      <div className="col-span-2 border p-3 space-y-3">
        <CategoryFilter
          selectedCategories={selectedCategories}
          onChangeCategoryHandler={onChangeCategoryHandler}
        />

        <RatingFilter
          selectedRating={selectedRating}
          onChangeRating={onChangeRatingHandler}
        />


        <div className="overflow-hidden">
          <h3 className="text-3xl font-semibold mt-4">Price Filter</h3>
          <div className="border">
            <input
              type="range"
              className="w-full"
              value={selectedPrice.max}
              min={initPriceFilter.min}
              max={initPriceFilter.max}
              onChange={(e) => {
                setSelectedPrice({
                  ...selectedPrice,
                  max: e.target.value,
                  isApplied: true,
                })
              }}
            />
            <div className="flex justify-between">
              <span> {initPriceFilter.min}</span>
              <span> {selectedPrice.max}</span>
            </div>
          </div>
        </div>

      </div>

      {/* products listing  */}
      <div className="col-span-10">
        <div>
          {selectedCategories.map(category => (
            <div>
              {category}
            </div>

          ))}
          <button onClick={clearAll} className="rounded-md border p-1 cursor-pointer hover:bg-gray-300"> Clear All</button>
        </div>
        <ProductListing products={products} />
      </div>
    </div>
  )
}

export default App;


// import { products } from "./data/products";

// function App() {
//   console.log("products", products)
//   console.log("product", products[0])

//   let index = 3

//   return (
//     <div className="max-w-sm border">
//       <img src={products[index].image} alt="" className="w-100 " />
//       <h3 className="text-3xl font-semibold">{products[index].title}</h3>
//       <p>{products[index].description}</p>
//       <h3 className="text-2xl"> Rs. {products[index].price}</h3>
//     </div>
//   )
// }

// export default App;