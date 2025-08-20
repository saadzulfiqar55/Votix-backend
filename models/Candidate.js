const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  party: { type: String, required: true },
  symbol: { type: String, required: true },
  constituency: { type: String, required: true }, // e.g., NA-1
  votes: { type: Number, default: 0 }
});

module.exports = mongoose.model("Candidate", candidateSchema);
