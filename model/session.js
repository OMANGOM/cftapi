const mongoose = require("mongoose");
 
const Session = mongoose.model=(
  "Session",
  new mongoose.Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      token: String,
      tokenExpiry: {
        type: Date,
        default: Date.now(),
      },
    },
    { timestamps: true }
  )
);
module.exports = Session;
