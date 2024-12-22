const Order = require("../models/Order");
const Restaurant = require("../models/Restaurant");

// Buyurtma yaratish
const createOrder = async (req, res) => {
    const { restaurantId, tableId, items } = req.body;

    try {
        const restaurant = await Restaurant.findById(restaurantId);

        if (!restaurant) {
            return res.status(404).json({ message: "Restoran topilmadi" });
        }

        const table = restaurant.tables.id(tableId);

        if (!table) {
            return res.status(404).json({ message: "Stol topilmadi" });
        }

        // Buyurtma umumiy narxini hisoblash
        const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

        // Buyurtmani yaratish
        const order = await Order.create({
            restaurant: restaurantId,
            table: tableId,
            items,
            totalPrice,
            createdBy: req.user._id,
        });

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: "Server xatosi", error: error.message });
    }
};

// Restoran bo'yicha barcha buyurtmalarni olish
const getOrdersByRestaurant = async (req, res) => {
    const { restaurantId } = req.params;

    try {
        const orders = await Order.find({ restaurant: restaurantId }).populate("createdBy", "name");

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Server xatosi", error: error.message });
    }
};

const updateOrderStatus = async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    try {
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: "Buyurtma topilmadi" });
        }

        // Holatni tekshirish
        if (!["pending", "preparing", "served", "paid"].includes(status)) {
            return res.status(400).json({ message: "Noto'g'ri buyurtma holati" });
        }

        // Buyurtma holatini yangilash
        order.status = status;
        await order.save();

        res.status(200).json({ message: "Buyurtma holati yangilandi", order });
    } catch (error) {
        res.status(500).json({ message: "Server xatosi", error: error.message });
    }
};

module.exports = {
    createOrder,
    getOrdersByRestaurant,
    updateOrderStatus,
};