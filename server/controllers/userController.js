const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("../config");

// JWT yaratish funksiyasi
const generateToken = (id) => {
    return jwt.sign({ id }, config.JWT_SECRET, { expiresIn: "30d" });
};

const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        // Foydalanuvchi mavjudligini tekshirish
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "Foydalanuvchi allaqachon mavjud" });
        }

        // Yangi foydalanuvchini yaratish
        const user = await User.create({
            name,
            email,
            password,
            role,
        });

        if (user) {
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user.id),
            });
        } else {
            res.status(400).json({ message: "Noto'g'ri foydalanuvchi ma'lumotlari" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server xatosi", error: error.message });
    }
};

// Login qilish
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user.id),
            });
        } else {
            res.status(401).json({ message: "Email yoki parol noto'g'ri" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server xatosi", error: error.message });
    }
};

// Profilni olish
const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            });
        } else {
            res.status(404).json({ message: "Foydalanuvchi topilmadi" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server xatosi", error: error.message });
    }
};

module.exports = { registerUser, loginUser, getProfile }