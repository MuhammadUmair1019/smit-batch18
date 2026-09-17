import express from 'express';
import mongoose from 'mongoose';
import User from './models/user.js';

const port = 4000;
const app = express();

app.use(express.json())

// CREATE
app.post("/", async (req, res) => {
    try {
        const user = await User.create(req.body);

        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// READ - Get all users
app.get("/", async (req, res) => {
    try {
        const users = await User.find();

        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// READ - Get one user
app.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// UPDATE
app.put("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE
app.delete("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


app.listen(port, () => {
    console.log(`Server listing on port ${port}`)
})

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/demo');

    console.log("MONGODB CONNECTED!")

}


