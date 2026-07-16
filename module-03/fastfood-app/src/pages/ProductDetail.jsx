import { useParams } from "react-router-dom"
import { products } from "../data/products"

function ProductDetail() {
    const { id } = useParams()

    console.log(typeof id)

    const product = products.find(product => product.id === +id)
    console.log(product)

    if (!product) {
        return <h1> Oops! Page not found</h1>
    }

    return (
        <div>
            <h1> Product Detail</h1>
            <h2>Title: {product.title} </h2>
            <h2>Description: {product.description} </h2>
            <img src={product.image} width="300" />
        </div>
    )
}

export default ProductDetail