const db = require("../connection/connection");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {TOKEN_KEY }= process.env;

// Register User
exports.registerUser = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ message: "Request body is required" });
        }
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "Username, email, and password are required" });
        }

        const existingUser = await db.user.findOne({
            where: { username }
        });

        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }

        const existingEmail = await db.user.findOne({
            where: { email }
        });

        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await db.user.create({
            username,
            email,
            password: hashedPassword
        });

        res.status(201).json({ userdata: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Login User
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please enter both email and password" });
        }

        const user = await db.user.findOne({
            where: { email }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const tokenData = {
            userId: user.id,
            email: user.email
        };

        const token = jwt.sign(tokenData, TOKEN_KEY, {
            expiresIn: "24h",
        });

        tokenData.token = token;

        res.status(200).json({ userdataWithToken: tokenData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
