// import
const express = require("express");

// init
const app = express();

// port
const port = 8089;

const users = [
    {
        id: 1,
        name: "Ali",
        email: "ali@example.com"
    },
    {
        id: 2,
        name: "Sara",
        email: "sara@example.com"
    },
    {
        id: 3,
        name: "Ahmed",
        email: "ahmed@example.com"
    }
];


app.get("/", (req, res) => {

    res.send("Hello World")
})


app.get("/users", (req, res) => {

    res.json(users)
})


app.get("/users/:id", (req, res) => {

    const user = users.find(u => u.id === +req.params.id)

    res.json(user)

})



app.listen(port, () => {
    console.log(`Server listing on http://localhost:${port}`)
})






