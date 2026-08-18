const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");
const {
  addCandidate,
  getAllCandidates,
  updateCandidate,
  deleteCandidate,
  getCandidates,
  voteCandidate,
  getResults,
} = require("../controllers/electionController");

// User routes
router.get("/candidates/:constituency", protect, getCandidates);
router.post("/vote", protect, voteCandidate);
router.get("/results", protect, getResults);

// Admin-only routes
router.get("/admin/candidates", protect, adminOnly, getAllCandidates);
router.post("/candidates", protect, adminOnly, addCandidate);
router.put("/candidates/:id", protect, adminOnly, updateCandidate);
router.delete("/candidates/:id", protect, adminOnly, deleteCandidate);

module.exports = router;