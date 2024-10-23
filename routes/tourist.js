const express = require("express");
const router = express.Router();
const Tourist = require("../models/Tourist");
const Tour = require("../models/Tour");

// Register a tourist for a tour
router.post("/", async (req, res) => {
  const { fName, lName, description, tour_id } = req.body;

  try {
    // Find the tour by its ID
    const tour = await Tour.findById(tour_id);
    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }

    // Check if the user is already registered for this tour
    const existingTourist = await Tourist.findOne({ tour_id, fName, lName });
    if (existingTourist) {
      return res
        .status(400)
        .json({ message: "You have already registered for this tour." });
    }

    // Create a new tourist and link it to the tour
    const newTourist = new Tourist({
      fName,
      lName,
      description,
      tour_id,
    });

    await newTourist.save();

    // Increase the number of participants by 1
    tour.participants = tour.participants + 1;
    await tour.save();

    res.json({ message: "Tourist registered successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
