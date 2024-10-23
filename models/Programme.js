const mongoose = require("mongoose");

const programmeSchema = new mongoose.Schema({
  type: String,
  name: String,
  description: String,
});

module.exports = mongoose.model("Programme", programmeSchema);
