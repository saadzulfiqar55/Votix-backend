const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: { 
      type: String,
      required: true,
      minlength: 6,
    },
    constituency: { 
      type: String,
      required: true 
    } // e.g. "NA-1"
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
