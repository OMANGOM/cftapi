const mongoose = require("mongoose");
const { stringify } = require("qs");

const User = mongoose.model(
  "User",
  new mongoose.Schema(
    {
      firstName: String,
      lastName: String,
      email: String,
      password: String,
      dob : Date,
      isActive: {
        type: Boolean,
        default: true,
      },
      roleId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Role'
      },
      fitBitId:String,
      fitBitAccessToken: String,
      fitBitRefreshToken: String,
      fitBitTokenExpiry: Date,
      fitBitScope: String,
      fitBitTokenType: String,
    },
    { timestamps: true }
  )
);
module.exports = User;
