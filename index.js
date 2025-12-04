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

// Delete a booking by ID
app.delete("/bookings/:id", async (req, res) => {
  try {
    const deleted = await Booking.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Error deleting booking" });
  }
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
