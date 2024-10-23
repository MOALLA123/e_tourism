// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const guideRoutes = require("./routes/guide");
const driverRoutes = require("./routes/driver");
const programmeRoutes = require("./routes/programme");
const tourRoutes = require("./routes/tour");
const touristRoutes = require("./routes/tourist");
const reportRoutes = require("./routes/report");
const { router: authRoutes } = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
// app.use(
//   cors({
//     origin: "*", // Allow all origins
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/e_tourism")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes); // Correctly using auth router
app.use("/api/tours", tourRoutes); // Example for using tour routes
//app.use("/api/auth", authRoutes);
app.use("/api/guides", guideRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/programmes", programmeRoutes);
app.use("/api/tourists", touristRoutes);
app.use("/api/reports", reportRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
