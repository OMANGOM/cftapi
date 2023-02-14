var mongoose = require("mongoose");

const Role = mongoose.model(
    "Role",
    new mongoose.Schema({
        role: String,
        isActive : {
            type : Boolean,
            default : true
        }
    }, { timestamps: true })
);
module.exports = Role;  