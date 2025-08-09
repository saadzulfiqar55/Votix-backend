const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  candidateId: { type: String, required: true }
});

const candidateSchema = new mongoose.Schema({
  name: String,
  party: String,
  constituency: String
});

const electionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  constituency: String,
  candidates: [candidateSchema],
  votes: [voteSchema]
}, { timestamps: true });

module.exports = mongoose.model('Election', electionSchema);
