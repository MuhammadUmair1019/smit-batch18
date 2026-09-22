import { configDotenv } from 'dotenv';
import express from 'express';

// imports 
import connectDB from './src/config/db.js';

import userRoutes from './src/routes/userRoutes.js';

// init
configDotenv();

const port = 8089;
const app = express();

// Middleware 
app.use(express.json())

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'OK' })
})


// User Routes
app.use('/users', userRoutes)

// Product Routes 





app.listen(port, () => {
    console.log(`Server listing on ${port}`)
})

connectDB()