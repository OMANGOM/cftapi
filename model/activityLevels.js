var mongoose = require("mongoose");

const activityLevels = mongoose.model(
    "activityLevels",
    new mongoose.Schema({
        name: String,
        id: Number,
        maxSpeedMPH: Number,
        mets: Number,
        minSpeedMPH : Number,
        parentId:Number,
       
        isActive : {
            type : Boolean,
            default : true
        }
    }, { timestamps: true })
);
module.exports = activityLevels;  