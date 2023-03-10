var mongoose = require("mongoose");

const activities = mongoose.model(
    "activities",
    new mongoose.Schema({
        id: Number,
        accessLevel: String,
        mets: Number,
        hasSpeed: Boolean,
        name: String,
        categoryId: Number,
        isActive : {
            type : Boolean,
            default : true
        }
    }, { timestamps: true })
);
module.exports = activities;  