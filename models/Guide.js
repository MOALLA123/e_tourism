const mongoose = require("mongoose");

const guideSchema = new mongoose.Schema({
  fName: String,
  lName: String,
  address: String,
  mobile: String,
  description: String,
});

module.exports = mongoose.model("Guide", guideSchema);
