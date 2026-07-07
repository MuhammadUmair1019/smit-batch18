import { useState } from "react";
import ProductListing from "./components/ProductListing";
import CategoryFilter from "./components/CategoryFilter";

import { getVisibleProducts } from "./data/product-filter";

function App() {
  const [selectedCategories, setSelectedCategories] = useState([])


  const onChangeCategoryHandler = (category, isChecked) => {
    if (isChecked) {
      setSelectedCategories([...selectedCategories, category])
    } else {
      setSelectedCategories(selectedCategories.filter(c => c !== category))
    }

  }

  const products = getVisibleProducts(selectedCategories)

  return (
    <div className="grid grid-cols-12 gap-2">
      {/* filters  */}
      <div className="col-span-2 border p-3">
        <CategoryFilter
          selectedCategories={selectedCategories}
          onChangeCategoryHandler={onChangeCategoryHandler}
        />
      </div>

      {/* products listing  */}
      <div className="col-span-10">
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

//   return (
//     <div className="max-w-sm border">
//       <img src={products[0].image} alt="" className="w-100 " />
//       <h3 className="text-3xl font-semibold">{products[0].title}</h3>
//       <p>{products[0].description}</p>
//       <h3 className="text-2xl"> Rs. {products[0].price}</h3>
//     </div>
//   )
// }

// export default App;