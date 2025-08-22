require("dotenv").config();
const mongoose = require("mongoose");
const Candidate = require("../models/Candidate");

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error(err));

const candidates = [
  // NA-1
  { name: "Ali Khan", party: "PTI", symbol: "🏏", constituency: "NA-1" },
  { name: "Zulaikha Begum", party: "PML-N", symbol: "🐅", constituency: "NA-1" },
  { name: "Bilal Ahmed", party: "PPP", symbol: "🏹", constituency: "NA-1" },
  { name: "Saira Qureshi", party: "MQM", symbol: "☂️", constituency: "NA-1" },

  // NA-2
  { name: "Faisal Ali", party: "PTI", symbol: "🏏", constituency: "NA-2" },
  { name: "Razia Khan", party: "PML-N", symbol: "🐅", constituency: "NA-2" },
  { name: "Kamran Shah", party: "PPP", symbol: "🏹", constituency: "NA-2" },
  { name: "Muniza Rafiq", party: "MQM", symbol: "☂️", constituency: "NA-2" },

  { name: "Faisal Ali", party: "PTI", symbol: "🏏", constituency: "NA-3" },
  { name: "Razia Khan", party: "PML-N", symbol: "🐅", constituency: "NA-3" },
  { name: "Kamran Shah", party: "PPP", symbol: "🏹", constituency: "NA-3" },
  { name: "Muniza Rafiq", party: "MQM", symbol: "☂️", constituency: "NA-3" },

  { name: "Faisal Ali", party: "PTI", symbol: "🏏", constituency: "NA-4" },
  { name: "Razia Khan", party: "PML-N", symbol: "🐅", constituency: "NA-4" },
  { name: "Kamran Shah", party: "PPP", symbol: "🏹", constituency: "NA-4" },
  { name: "Muniza Rafiq", party: "MQM", symbol: "☂️", constituency: "NA-4" },

  { name: "Faisal Ali", party: "PTI", symbol: "🏏", constituency: "NA-5" },
  { name: "Razia Khan", party: "PML-N", symbol: "🐅", constituency: "NA-5" },
  { name: "Kamran Shah", party: "PPP", symbol: "🏹", constituency: "NA-5" },
  { name: "Muniza Rafiq", party: "MQM", symbol: "☂️", constituency: "NA-5" },

  { name: "Faisal Ali", party: "PTI", symbol: "🏏", constituency: "NA-6" },
  { name: "Razia Khan", party: "PML-N", symbol: "🐅", constituency: "NA-6" },
  { name: "Kamran Shah", party: "PPP", symbol: "🏹", constituency: "NA-6" },
  { name: "Muniza Rafiq", party: "MQM", symbol: "☂️", constituency: "NA-6" },

  // Add more constituencies as needed
];

const seedCandidates = async () => {
  try {
    await Candidate.deleteMany(); // ⚠️ clears existing candidates
    await Candidate.insertMany(candidates);
    console.log("✅ Candidates seeded successfully");
    mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
};

seedCandidates();
