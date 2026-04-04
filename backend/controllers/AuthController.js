const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

// ================= SIGNUP =================
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log("👉 Signup Data:", req.body);

    const existingUser = await userModel.findUserByEmail(email);
    console.log("👉 Existing User:", existingUser);

    if (existingUser && existingUser.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await userModel.createUser(name, email, hashedPassword);
    console.log("👉 User Created:", result);

    return res.status(201).json({
      success: true,
      message: "Signup successful",
    });

  } catch (error) {
    console.log("❌ SIGNUP ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Signup failed",
    });
  }
};

// ================= LOGIN =================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("👉 Login Data:", req.body);

    const userData = await userModel.findUserByEmail(email);
    console.log("👉 User Data:", userData);

    if (!userData || userData.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = userData[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      "secret_key",
      { expiresIn: "1d" }
    );

    return res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.id,       // ✅ this was missing before
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.log("❌ LOGIN ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Login failed",
    });
  }
};