const Order = require("../models/Order");

// Restoran buyurtmalari bo'yicha umumiy hisobot
const getRestaurantReport = async (req, res) => {
    const { restaurantId } = req.params;

    try {
        const orders = await Order.find({ restaurant: restaurantId });

        if (orders.length === 0) {
            return res.status(404).json({ message: "Bu restoran uchun buyurtmalar topilmadi" });
        }

        const totalIncome = orders.reduce((sum, order) => sum + order.totalPrice, 0);
        const totalOrders = orders.length;

        const report = {
            totalIncome,
            totalOrders,
            orders,
        };

        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ message: "Server xatosi", error: error.message });
    }
};

module.exports = { getRestaurantReport };