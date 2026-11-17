require("dotenv").config();

const { Worker } = require("bullmq");
const IORedis = require("ioredis");

const connection = new IORedis(process.env.REDIS_URL, {
    maxRetriesPerRequest: null
});

const worker = new Worker(
    "email-queue",
    async (job) => {
        console.log("Processing email:", job.data.email);

        await new Promise(resolve =>
            setTimeout(resolve, 5000)
        );

        console.log("Email sent successfully!");
    },
    { connection }
);

console.log("Worker started!");