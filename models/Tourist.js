const mongoose = require("mongoose");

const TouristSchema = new mongoose.Schema({
  fName: { type: String, required: true },
  lName: { type: String, required: true },
  description: { type: String },
  tour_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tour",
    required: true,
  },
});

module.exports = mongoose.model("Tourist", TouristSchema);
