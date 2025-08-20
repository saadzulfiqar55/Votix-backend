const express = require("express");
const Candidate = require("../models/Candidate");
const protect = require("../middleware/authMiddleware"); // 👈 import your middleware

const router = express.Router();

// ✅ Get candidates by constituency
router.get("/candidates/:constituency", protect, async (req, res) => {
  try {
    const { constituency } = req.params;
    const candidates = await Candidate.find({ constituency });
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Cast vote
router.post("/vote", protect, async (req, res) => {
  try {
    const { candidateId } = req.body;

    const candidate = await Candidate.findById(candidateId);
    if (!candidate) return res.status(404).json({ message: "Candidate not found" });

    candidate.votes += 1;
    await candidate.save();

    res.json({ message: "Vote submitted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
