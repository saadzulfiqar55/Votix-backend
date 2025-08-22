const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware"); // Auth middleware
const {
  addCandidate,
  getCandidates,
  voteCandidate,
  getResults,
} = require("../controllers/electionController");

// ✅ Add candidate (for now, anyone with token can add)
router.post("/candidates", protect, addCandidate);

// ✅ Get candidates by constituency
router.get("/candidates/:constituency", protect, getCandidates);

// ✅ Vote for a candidate
router.post("/vote", protect, voteCandidate);

// ✅ Global results (party-wise aggregation)
router.get("/results", protect, getResults);

module.exports = router;
