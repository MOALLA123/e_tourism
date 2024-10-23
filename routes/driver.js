// routes/driver.js
const express = require("express");
const Driver = require("../models/Driver");
const router = express.Router();

// Add a new driver
router.post("/", async (req, res) => {
  const driver = new Driver(req.body);
  try {
    await driver.save();
    res.json({ message: "Driver added successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a driver by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedDriver = await Driver.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedDriver);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a driver by ID
router.delete("/:id", async (req, res) => {
  try {
    await Driver.findByIdAndDelete(req.params.id);
    res.json({ message: "Driver deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all drivers
router.get("/", async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.json(drivers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
