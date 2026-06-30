import ProductInfo from "../components/ProductInfo"


let products = [
    {
        id: 101,
        title: "LED",
        price: 50000,
        status: true,
    },
    {
        id: 102,
        title: "Mobile",
        price: 30000,
        status: false,
    },
    {
        id: 103,
        title: "Laptop",
        price: 20000,
        status: true,
    },
]



// 1) Show all products by sorting on price (low high)
// 2) Show only those products whose price is greater than 45000, sorted by price (high to low)
// 3) Show all products after increasing their price by 10%.
// 4) Show all products whose name starts with 'a' or 'A'
// 5) Show top 3 most expensive products
// 6) Show all products with price labeled as (Below average or Above average)

// 6) Show all products with price labeled as (Below average or Above average)


function average() {
    let sum = 0;
    for (let i = 0; i < products.length; i++) {
        sum += products[i].price
    }

    return sum / products.length;
}

function TaskSolutions() {

    const avg = average()
    console.log(avg)

    return (
        <>
            <h1>Stock Details</h1>
            <div>
                {products.map((product) => (
                    <ProductInfo
                        key={product.id}
                        isAboveAvg={avg < product.price}
                        product={{ ...product, price: product.price * 1.10 }}
                    />
                ))}
            </div>
        </>
    )
}

// function TaskSolutions() {

//     return (
//         <>
//             <h1>Stock Details</h1>
//             <div>
//                 <h3> Show all products after increasing their price by 10%.</h3>
//                 {products.map((product) => (
//                     <ProductInfo key={product.id} product={{ ...product, price: product.price * 1.10 }} />
//                 ))}
//             </div>
//         </>
//     )
// }


export default TaskSolutions