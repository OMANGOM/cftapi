var mongoose = require("mongoose");

const ActiveZoneMinutes = mongoose.model(
    "ActiveZoneMinutes",
    new mongoose.Schema({
        fitBitId: String,
        fatBurnActiveZoneMinutes: Number,
        cardioActiveZoneMinutes : Number,
        peakActiveZoneMinutes: Number,
        activeZoneMinutes:Number,
        onDateTime: Date,
    }, { timestamps: true })
);
module.exports = ActiveZoneMinutes;  