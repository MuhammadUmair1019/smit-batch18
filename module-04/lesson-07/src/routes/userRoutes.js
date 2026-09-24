import express from "express";

import {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    registerUser,
    login,
    getProfile
} from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


// Auth 

router.post("/register", registerUser)
router.post("/login", login)

router.get('/profile', authMiddleware, getProfile)

export default router;

// import express from "express";

// import {
//     createUser,
//     getUsers,
//     getUser,
//     updateUser,
//     deleteUser
// } from "../controllers/userController.js";

// const router = express.Router();

// router.post("/", createUser);
// router.get("/", getUsers);
// router.get("/:id", getUser);
// router.put("/:id", updateUser);
// router.delete("/:id", deleteUser);




// export default router;
