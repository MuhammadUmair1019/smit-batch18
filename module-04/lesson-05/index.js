const express = require("express");

const app = express();
const PORT = 8089;

// Middleware to parse JSON
app.use(express.json());

// Temporary in-memory data
let users = [
    { id: 1, name: "Ali", email: "ali@example.com" },
    { id: 2, name: "Sara", email: "sara@example.com" },
];

function myMiddlware(req, res, next) {
    console.log(`${req.method} request made to ${req.url}`);

    req.userId = "245656xc";

    req.requestTime = D
    ate.now()

    next()
}

app.use(myMiddlware)

// GET - Get all users
app.get("/", (req, res) => {
    // console.log("req -->", req)
    console.log('req.userId ->', req.userId)
    console.log(req.requestTime)
    res.json({ message: "Hello World" });
});




// GET - Get all users
app.get("/users", (req, res) => {


    res.json(users);
});

// GET - Get one user
app.get("/users/:id", (req, res) => {
    const id = Number(req.params.id);

    const user = users.find((user) => user.id === id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
});

// POST - Create a user
app.post("/users", (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            message: "Name and email are required",
        });
    }

    const newUser = {
        id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
        name,
        email,
    };

    users.push(newUser);

    res.status(201).json(newUser);
});

// PUT - Update a user
app.put("/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const { name, email } = req.body;

    const user = users.find((user) => user.id === id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    if (name) user.name = name;
    if (email) user.email = email;

    res.json(user);
});

// DELETE - Delete a user
app.delete("/users/:id", (req, res) => {
    const id = Number(req.params.id);

    const userExists = users.some((user) => user.id === id);

    if (!userExists) {
        return res.status(404).json({ message: "User not found" });
    }

    users = users.filter((user) => user.id !== id);

    res.json({ message: "User deleted successfully" });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
