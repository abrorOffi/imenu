const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getProfile } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

// Ro'yxatdan o'tish
router.post("/register", registerUser);

// Login qilish
router.post("/login", loginUser);

// Profilni olish (faqat autentifikatsiya qilingan foydalanuvchilar)
router.get("/profile", protect, getProfile);

module.exports = router;
