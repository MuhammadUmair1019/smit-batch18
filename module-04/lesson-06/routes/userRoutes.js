import express from 'express'

const router = express.Router();

router.get("/", (req, res) => {
    res.json({ message: 'OK' })
})

// router.post('/users')


export default router;