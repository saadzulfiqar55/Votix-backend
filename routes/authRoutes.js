const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      isAdmin: role === 'admin' // if role is admin, set true
    });

    await user.save();
    res.json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Registration error:', err); // full error in backend terminal
    res.status(500).json({ error: err.message });
  }

});



// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt:", { email, password });

  try {
    const user = await User.findOne({ email });
    console.log("User found in DB:", user);

    if (!user) return res.status(400).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match result:", isMatch);

    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, isAdmin: user.isAdmin });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;
