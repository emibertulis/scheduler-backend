require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Booking = require("./models/Booking");

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Mongo error:", err.message));

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Create a booking
app.post("/book", async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.json({ success: true, booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error saving booking" });
  }
});

// Get all bookings
app.get("/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching bookings" });
  }
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
// DEBUG: create a test booking from the browser
app.get("/test-create", async (req, res) => {
  try {
    const booking = await Booking.create({
      name: "Test User",
      phone: "0000000000",
      service: "Test Service",
      date: "2025-01-01",
      time: "10:00",
    });
    res.json({ success: true, booking });
  } catch (err) {
    console.error("Error in /test-create:", err);
    res.status(500).json({ success: false, message: "Error in test-create" });
  }
});
  
    console.log(`Server running on port ${PORT}`);
});
