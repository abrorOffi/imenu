
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const TableSchema = new mongoose.Schema({
    number: { type: Number, required: true },
    qrCode: { type: String }, // QR kod saqlash uchun
});

const MenuItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
});

const RestaurantSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    location: { type: String },
    tables: [TableSchema],
    menu: [MenuItemSchema],
});

module.exports = mongoose.model("Restaurant", RestaurantSchema);