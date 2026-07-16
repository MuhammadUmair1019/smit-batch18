import { Link, Route, Routes } from "react-router-dom";
import Collection from "./pages/Collection";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";


function App() {

  return (
    <>

      <ul className="flex gap-3">
        <li>
          <Link to="/" className="underline text-blue-400 hover:text-blue-600"> Home</Link>
        </li>
        <li>
          <Link to="/collection" className="underline text-blue-400 hover:text-blue-600"> Collection</Link>
        </li>
        <li>
          <Link to="/cart" className="underline text-blue-400 hover:text-blue-600"> Cart</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/collection/:id" element={<ProductDetail />} />
      </Routes>
    </>
    // <Collection />
  )
}

export default App;