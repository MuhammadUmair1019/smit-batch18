require("dotenv").config();

const express = require("express");
const { Queue } = require("bullmq");
const IORedis = require("ioredis");

const app = express();
app.use(express.json());

const connection = new IORedis(process.env.REDIS_URL, {
    maxRetriesPerRequest: null
});

const emailQueue = new Queue("email-queue", {
    connection
});

app.post("/send-email", async (req, res) => {
    const job = await emailQueue.add("send-email", {
        email: req.body.email
    });

    res.json({
        success: true,
        jobId: job.id
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});