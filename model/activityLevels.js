var mongoose = require("mongoose");

const activityLevels = mongoose.model(
    "activityLevels",
    new mongoose.Schema({
        id: Number,
        maxSpeedMPH: Number,
        mets: Number,
        minSpeedMPH : Number,
        name: String,
        parentId:Number,
        isActive : {
            type : Boolean,
            default : true
        }
    }, { timestamps: true })
);
module.exports = activityLevels;  