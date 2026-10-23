const express = require("express");

const app = express();

app.use(express.json())


// Simple in-memory cache
let cache = {};


const products = [
    { id: 1, name: "Laptop" },
    { id: 2, name: "Phone" }
];


app.get("/products", async (req, res) => {
    // Check whether data is cached
    if (cache.products) {
        console.log("Cache hit");
        return res.json(cache.products);
    }


    console.log("Cache miss");

    // Simulate fetching data from a databas

    // Store data in cache
    cache.products = [...products];

    res.json(products);
});


app.post("/products", async (req, res) => {

    console.log(req.body)
    // products.push(req.body)

    products.push(req.body)

    cache = {}

    res.json(products)
})

app.listen(3000, () => {
    console.log("Server running on port 3000");
});