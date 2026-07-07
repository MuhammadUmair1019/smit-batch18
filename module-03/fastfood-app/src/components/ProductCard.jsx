

function ProductCard(props) {
    const { product } = props;

    return (
        <div className="max-w-sm border border-gray-300 shadow rounded-xl">
            <img src={product.image} alt="" className="w-100 h-72 object-cover rounded-t-xl" />
            <div className="min-h-40">
                <h3 className="text-3xl font-semibold">{product.title}</h3>
                <p>{product.description}</p>
                <h3 className="text-2xl"> Rs. {product.price}</h3>
            </div>
        </div>
    )
}

export default ProductCard;