// routes/programme.js
const express = require("express");
const Programme = require("../models/Programme");
const router = express.Router();
const { authenticateToken, isAdmin } = require("./auth"); // Import the middlewar

// Add a new programme
router.post("/", authenticateToken, isAdmin, async (req, res) => {
  const programme = new Programme(req.body);
  try {
    await programme.save();
    res.json({ message: "Programme added successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all programmes
router.get("/", async (req, res) => {
  try {
    const programmes = await Programme.find();
    res.json(programmes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get programme details by ID
router.get("/:id", async (req, res) => {
  try {
    const programme = await Programme.findById(req.params.id);
    if (!programme) {
      return res.status(404).json({ message: "Programme not found" });
    }
    res.json(programme);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
