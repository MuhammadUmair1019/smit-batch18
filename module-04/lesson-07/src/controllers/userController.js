import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

// CREATE
export const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);

        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// READ - Get all users
export const getUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.json(users);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// READ - Get one user
export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json(user);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// UPDATE
export const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json(user);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// DELETE
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json({
            message: "User deleted successfully"
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};




// Register
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message: "Email already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });



    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};


// login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const passwordMatched = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatched) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }


        const token = jwt.sign(
            {
                userId: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN || "7d"
            }
        );

        res.json({
            message: "Login successful",
            token
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};

// profile
export const getProfile = async (req, res) => {
    try {
        const user = await User
            .findById(req.user.userId)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json({
            user
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};
