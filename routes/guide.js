// routes/guide.js
const express = require("express");
const Guide = require("../models/Guide");
const router = express.Router();

// Add a new guide
router.post("/", async (req, res) => {
  const guide = new Guide(req.body);
  try {
    await guide.save();
    res.json({ message: "Guide added successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a guide by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedGuide = await Guide.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedGuide);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a guide by ID
router.delete("/:id", async (req, res) => {
  try {
    await Guide.findByIdAndDelete(req.params.id);
    res.json({ message: "Guide deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all guides
router.get("/", async (req, res) => {
  try {
    const guides = await Guide.find();
    res.json(guides);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
