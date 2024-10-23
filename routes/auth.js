const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });

  jwt.verify(token, "your_jwt_secret", (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin\n") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};

// Register a new user
router.post("/register", async (req, res) => {
  const { email, password, lName, fName, role } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user and assign default role (user) if not provided
    const user = new User({
      email,
      password: hashedPassword,
      lName,
      fName,
      role: role || "user",
    });

    // Save user to database
    await user.save();
    res.json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login a user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    // Check if the password is valid
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ error: "Invalid password" });

    // Generate JWT token with user ID and role
    const token = jwt.sign(
      { id: user._id, role: user.role }, // Include role in the token
      "your_jwt_secret",
      { expiresIn: "1h" }
    );

    // Send token and role to the client
    res.json({ token, role: user.role, lName: user.lName, fName: user.fName });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/admin-action", authenticateToken, isAdmin, (req, res) => {
  res.json({ message: "Admin action performed successfully." });
});

// GET /profile - Return the logged-in user's profile information
router.get("/profile", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the user's profile information
    res.json({
      fName: user.fName,
      lName: user.lName,
      email: user.email,
      _id: user._id,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

module.exports = {
  router,
  authenticateToken,
  isAdmin,
};
