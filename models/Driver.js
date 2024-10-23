const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  fName: String,
  lName: String,
  plateNumber: String,
  description: String,
});

module.exports = mongoose.model("Driver", driverSchema);
