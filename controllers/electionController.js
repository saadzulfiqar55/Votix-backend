const Candidate = require("../models/Candidate");
const User = require("../models/User");

// Add candidate (Admin)
exports.addCandidate = async (req, res) => {
  try {
    const { name, party, symbol, constituency } = req.body;
    const candidate = new Candidate({ name, party, symbol, constituency });
    await candidate.save();
    res.status(201).json({ message: "Candidate added successfully", candidate });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get ALL candidates for Admin Panel
exports.getAllCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update candidate (Admin)
exports.updateCandidate = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCandidate = await Candidate.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedCandidate) return res.status(404).json({ message: "Candidate not found" });
    res.json({ message: "Candidate updated successfully", candidate: updatedCandidate });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete candidate (Admin)
exports.deleteCandidate = async (req, res) => {
  try {
    const { id } = req.params;
    const candidate = await Candidate.findByIdAndDelete(id);
    if (!candidate) return res.status(404).json({ message: "Candidate not found" });
    res.json({ message: "Candidate deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get candidates by constituency
exports.getCandidates = async (req, res) => {
  try {
    const constituency = req.params.constituency;
    const candidates = await Candidate.find({
      constituency: { $regex: `^${constituency}$`, $options: "i" },
    });
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Vote for a candidate
exports.voteCandidate = async (req, res) => {
  try {
    const userId = req.user.id;
    const candidateId = req.body.candidateId;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.hasVoted) {
      return res.status(403).json({ message: "You have already voted!" });
    }

    const candidate = await Candidate.findById(candidateId);
    if (!candidate) return res.status(404).json({ message: "Candidate not found" });

    candidate.votes += 1;
    await candidate.save();

    user.hasVoted = true;
    await user.save();

    res.json({ message: "✅ Vote submitted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get global results
exports.getResults = async (req, res) => {
  try {
    const results = await Candidate.aggregate([
      { $group: { _id: "$party", totalVotes: { $sum: "$votes" } } },
    ]);
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};