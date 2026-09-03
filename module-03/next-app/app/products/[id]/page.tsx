

export default async function ProductDetail({ params }) {
    const { id } = await params;

    return (
        <div>
            <h1>Product Detail page </h1>
            <h3>Product ID = {id}</h3>
        </div>
    )
}
