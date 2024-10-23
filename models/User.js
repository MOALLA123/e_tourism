const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fName: { type: String, required: true },
  lName: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" }, // Add role field
});

module.exports = mongoose.model("User", UserSchema);
