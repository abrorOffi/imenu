const Restaurant = require("../models/Restaurant");
const QRCode = require("qrcode");

const createRestaurant = async (req, res) => {
    const { name, location } = req.body;

    try {
        const restaurant = await Restaurant.create({
            owner: req.user._id, // Foydalanuvchini autentifikatsiyadan o'tganidan so'ng qo'shamiz
            name,
            location,
        });

        res.status(201).json(restaurant);
    } catch (error) {
        res.status(500).json({ message: "Server xatosi", error: error.message });
    }
};

// Stol qo'shish
const addTable = async (req, res) => {
    const { id } = req.params; // Restoran ID
    const { tableNumber } = req.body;

    try {
        const restaurant = await Restaurant.findById(id);

        if (!restaurant) {
            return res.status(404).json({ message: "Restoran topilmadi" });
        }

        // Faqat restoranning egasi stol qo'shishi mumkin
        if (restaurant.owner.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Siz bu restoranni boshqara olmaysiz" });
        }

        // Stolni qo'shish
        const newTable = { number: tableNumber };
        restaurant.tables.push(newTable);
        await restaurant.save();

        res.status(201).json({ message: "Stol qo'shildi", restaurant });
    } catch (error) {
        res.status(500).json({ message: "Server xatosi", error: error.message });
    }
};

// QR kod yaratish
const generateQRCode = async (req, res) => {
    const { id, tableId } = req.params;

    try {
        const restaurant = await Restaurant.findById(id);

        if (!restaurant) {
            return res.status(404).json({ message: "Restoran topilmadi" });
        }

        const table = restaurant.tables.id(tableId);
        if (!table) {
            return res.status(404).json({ message: "Stol topilmadi" });
        }

        // QR kod yaratish
        const qrData = {
            restaurantId: id,
            tableId: tableId,
        };

        const qrCode = await QRCode.toDataURL(JSON.stringify(qrData));

        // QR kodni stolga qo'shish
        table.qrCode = qrCode;
        await restaurant.save();

        res.status(200).json({ message: "QR kod yaratildi", qrCode });
    } catch (error) {
        res.status(500).json({ message: "Server xatosi", error: error.message });
    }
};

// Barcha restoranlarni olish (faqat egasi uchun)
const getAllRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find({ owner: req.user._id });

        res.status(200).json(restaurants);
    } catch (error) {
        res.status(500).json({ message: "Server xatosi", error: error.message });
    }
};

module.exports = {
    createRestaurant,
    addTable,
    generateQRCode,
    getAllRestaurants,
};