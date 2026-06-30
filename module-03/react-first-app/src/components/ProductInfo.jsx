

function ProductInfo(props) {
    const { product, isAboveAvg } = props

    return (
        <div>
            <h3>Title: {product.title}</h3>
            <h4>Price: {product.price}</h4>
            <p>{product.status ? "Available" : "Not Available"}</p>
            <p> {isAboveAvg ? "Above Average" : "Below Average"}</p>
            <hr />
        </div>
    )
}

export default ProductInfo;