const User = require("../models/userModels");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.postRegister = async (req, res) => {
    try {
        const { name, email, number, password, role } = req.body;

        if (!name || !email || !number || !password || !role) {
            return res.json({ msg: 'all fields are required', result: false })
        }

        const existingUser = await User.findOne({ email: email })
        if (existingUser) {
            return res.json({ msg: 'user is already register', result: false })
        }

        const hashPassword = await bcrypt.hash(password, 10);

        User.create({
            name,
            email,
            number,
            password: hashPassword,
            role
        })

        res.json({ msg: 'user register success', result: true })

    } catch (error) {
        console.log(error);

        return res.json({ msg: 'error occured', result: false })
    }
}


exports.postLogin = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({
                msg: "All fields are required",
                result: false
            });
        }

        const allowedRoles = ["student", "teacher"];

        if (!allowedRoles.includes(role)) {
            return res.status(400).json({
                msg: "Invalid role",
                result: false
            });
        }

        const existingUser = await User.findOne({
            email: email.trim().toLowerCase()
        }).select("+password");

        console.log(existingUser)

        if (!existingUser) {
            return res.status(404).json({
                msg: "User is not registered",
                result: false
            });
        }

        if (existingUser.role !== role) {
            return res.status(403).json({
                msg: "You cannot log in with this role",
                result: false
            });
        }

        if (!existingUser.password) {
            return res.status(500).json({
                msg: "Password is not configured for this user",
                result: false
            });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            existingUser.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                msg: "Incorrect password",
                result: false
            });
        }

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is missing in environment variables");
        }

        const token = jwt.sign(
            {
                id: existingUser._id,
                name: existingUser.name,
                role: existingUser.role,
                email: existingUser.email
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.status(200).json({
            msg: "Login successful",
            result: true,
            token
        });

    } catch (error) {
        console.error("Login Error:", error);

        return res.status(500).json({
            msg: "Internal server error during login",
            result: false
        });
    }
};


