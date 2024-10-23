const express = require("express");
const router = express.Router();
const Tour = require("../models/Tour"); // Make sure the Tour model is imported
const mongoose = require("mongoose");
// Add a new tour
router.post("/", async (req, res) => {
  const { guide_id, driver_id, price, number, programme_id, name } = req.body;

  try {
    const newTour = new Tour({
      name,
      guide_id,
      driver_id,
      price,
      number,
      programme_id,
    });

    await newTour.save();
    res.json({ message: "Tour added successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//delete tour
router.delete("/:id", async (req, res) => {
  try {
    const tourId = req.params.id;

    // Check if tour ID is valid
    if (!mongoose.Types.ObjectId.isValid(tourId)) {
      return res.status(400).json({ message: "Invalid tour ID" });
    }

    const deletedTour = await Tour.findByIdAndDelete(tourId);

    if (!deletedTour) {
      return res.status(404).json({ message: "Tour not found" });
    }

    res.status(200).json({ message: "Tour deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting tour", error: error.message });
  }
});

// GET /api/tours - Fetch all tours with populated guide, driver, and programme data
router.get("/", async (req, res) => {
  try {
    const tours = await Tour.find()
      .populate("guide_id")
      .populate("driver_id")
      .populate("programme_id");

    res.json(tours);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Search tours by name
router.get("/search", async (req, res) => {
  const { name } = req.query;
  const cleanedName = name ? name.trim() : "";
  if (!cleanedName) {
    return res
      .status(400)
      .json({ message: "Please provide a valid search term." });
  }

  try {
    const regex = new RegExp(cleanedName, "i");
    console.log("Searching for tours with regex:", regex);

    const tours = await Tour.find({
      name: { $regex: regex },
    });

    console.log("Tours found:", tours);

    if (tours.length === 0) {
      return res
        .status(404)
        .json({ message: "No tours found matching your search." });
    }

    res.json(tours);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
