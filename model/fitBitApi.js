var mongoose = require("mongoose");

const FitBitAPi = mongoose.model(
    "FitBitAPi",
    new mongoose.Schema({
        appName:String,
        clientId: String,
        clientSecret: String,
        redirectURI: String,
        authorizationURL: String,
        tokenRequestURL: String,
        defaultScope: String,
        heartRateUpdateSec: Number,
        reqTokenExpiresSec: Number,
        reqAuthCodeExpiresSec: Number,
        lastUpdateTs: Date,

        isActive : {
            type : Boolean,
            default : true
        }
    }, { timestamps: true })
);
module.exports = FitBitAPi;  



 