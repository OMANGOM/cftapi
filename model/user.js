const { Date } = require("mongoose");
var mongoose = require("mongoose");

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
    },
    { timestamps: true }
  )
);
module.exports = User;
