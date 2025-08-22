const Candidate = require("../models/Candidate");

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
    console.log("Querying candidates for:", constituency); // 🔹 debug
    const candidates = await Candidate.find({
      constituency: { $regex: `^${constituency}$`, $options: "i" } // case-insensitive
    });
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Vote for a candidate
exports.voteCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.body.candidateId);
    if (!candidate) return res.status(404).json({ message: "Candidate not found" });
    candidate.votes += 1;
    await candidate.save();
    res.json({ message: "Vote submitted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get global results
exports.getResults = async (req, res) => {
  try {
    const results = await Candidate.aggregate([
      { $group: { _id: "$party", totalVotes: { $sum: "$votes" } } }
    ]);
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
