var mongoose = require("mongoose");

const heartActivities = mongoose.model(
    "heartActivities",
    new mongoose.Schema({
        fitBitId: String,
        onDateTime: Date,
        restingHeartRate: Number,
        heartRateZones:[{
            caloriesOut: Number,
            max: Number,
            min: Number,
            minutes: Number,
            name: String,
        }],
    }, { timestamps: true })
);
module.exports = heartActivities;  




 