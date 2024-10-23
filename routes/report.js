// routes/report.js
const express = require("express");
const Tour = require("../models/Tour");
const Driver = require("../models/Driver");
const router = express.Router();

// Generate report on tours between two dates
router.get("/tours", async (req, res) => {
  const { startDate, endDate } = req.query;
  try {
    const tours = await Tour.find({
      date: { $gte: new Date(startDate), $lte: new Date(endDate) },
    }).populate("driver_id");

    const report = tours.reduce((acc, tour) => {
      const driver = tour.driver_id;
      if (!acc[driver._id]) {
        acc[driver._id] = {
          driver: driver.fName + " " + driver.lName,
          toursCount: 0,
        };
      }
      acc[driver._id].toursCount++;
      return acc;
    }, {});

    res.json(Object.values(report));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
