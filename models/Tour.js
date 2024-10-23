const mongoose = require("mongoose");
const TourSchema = new mongoose.Schema({
  name: { type: String, required: true },
  guide_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Guide",
    required: true,
  },
  driver_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Driver",
    required: true,
  },
  programme_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Programme",
    required: true,
  },
  price: { type: Number, required: true },
  number: { type: Number, required: true },
  participants: { type: Number, default: 0 }, // حقل تتبع عدد المشاركين
});
module.exports = mongoose.model("Tour", TourSchema);
