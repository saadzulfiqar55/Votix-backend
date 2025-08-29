const Candidate = require("../models/Candidate");
const User = require("../models/User");

// Add candidate
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

// Get candidates by constituency
exports.getCandidates = async (req, res) => {
  try {
    const constituency = req.params.constituency;
    console.log("Querying candidates for:", constituency);
    const candidates = await Candidate.find({
      constituency: { $regex: `^${constituency}$`, $options: "i" },
    });
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Vote for a candidate (only once per user)
exports.voteCandidate = async (req, res) => {
  try {
    const userId = req.user.id; // comes from authMiddleware
    const candidateId = req.body.candidateId;

    // Find the user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if already voted
    if (user.hasVoted) {
      return res.status(403).json({ message: "You have already voted!" });
    }

    // Find candidate
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) return res.status(404).json({ message: "Candidate not found" });

    // Cast vote
    candidate.votes += 1;
    await candidate.save();

    // Mark user as voted
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
