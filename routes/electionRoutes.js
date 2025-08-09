const express = require('express');
const router = express.Router();
const Election = require('../models/Elections');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Create Election (Admin only)
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const { title, description, constituency, candidates } = req.body;

    const election = new Election({
      title,
      description,
      constituency,
      candidates,
      createdBy: req.user._id
    });

    await election.save();
    res.status(201).json(election);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get All Elections (Admin only for panel, public for voting later)
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const elections = await Election.find();
    res.json(elections);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
