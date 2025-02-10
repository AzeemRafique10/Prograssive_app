require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
});

const User = mongoose.model("User", UserSchema);
// const Product = mongoose.model("Product", ProductSchema);

// Sync Offline Data
app.post("/api/sync", async (req, res) => {
  try {
    const { users, products } = req.body;

    if (users && users.length) {
      await User.insertMany(users, { ordered: false });
    }
    if (products && products.length) {
      await Product.insertMany(products, { ordered: false });
    }

    res.status(200).json({ message: "Offline data synced successfully!" });
  } catch (error) {
    console.error("Sync error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/users", async (req, res) => {
  try {
    const { name, age } = req.body;
    if (!name || !age) {
      return res.status(400).json({ message: "Name and age are required!" });
    }
    const newUser = new User({ name, age });
    await newUser.save();
    res.status(201).json({ message: "User saved!", user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/users/:username", async (req, res) => {
  try {
    const { username } = req.params;
    console.log("Delete request received for username:", username);

    const deletedUser = await User.findOneAndDelete({ name: username });

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
