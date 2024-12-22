const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config");
const cors = require("cors");


// API yo'nalishlari
const userRoutes = require("./routes/userRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const orderRoutes = require("./routes/orderRoutes");
const reportRoutes = require("./routes/reportRoutes");

const app = express();

app.use(cors());

// Middleware
app.use(bodyParser.json());

// API yo'nalishlarini ulash
app.use("/api/users", userRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reports", reportRoutes);

mongoose
    .connect(config.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("DB connection error:", err));

// Portni tinglash
const PORT = config.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});