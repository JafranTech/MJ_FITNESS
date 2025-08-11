const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const User = require("./models/User");
const Order = require("./models/Order");

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const MONGO_URI = "mongodb+srv://jafran:kingjafran@cluster0.84wxfsz.mongodb.net/gymDB?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("âœ… MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

app.post("/api/register", async (req, res) => {
  try {
    const { name, age, gender, level, cardio, training } = req.body;
    if (!name || !age || !gender || !level || !cardio || !training) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const user = new User({ name, age, gender, level, cardio, training });
    await user.save();
    res.status(201).json({ message: "Registered successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/buy", async (req, res) => {
  try {
    const { item, price } = req.body;
    if (!item || !price) return res.status(400).json({ error: "Invalid item" });
    const order = new Order({ item, price });
    await order.save();
    res.status(201).json({ message: "Order created", orderId: order._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`ðŸš€ Server running on port ${PORT}`));