import { configDotenv } from "dotenv";
import express from "express";

import connectDB from "./src/config/db.js";
import userRoutes from "./src/routes/userRoutes.js";

configDotenv();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "OK"
    });
});

// app.use("/users", userRoutes);

app.use(userRoutes)


const port = process.env.PORT || 8089;

const startServer = async () => {
    await connectDB();

    app.listen(port, () => {
        console.log(`Server listening on ${port}`);
    });
};

startServer();