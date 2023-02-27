const mongoose  = require("mongoose");
const fitBitUser = mongoose.model(
    "fitBitUser",
    new mongoose.Schema({
     userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
         },
        fitBitUserID: String,
        approvedScope: String,
        tokenType :String,
        accessToken :String,
        tokenExpiresIn : Date, 
        refreshToken :String, 
        reqTokenErrors:String,
        isActive : {
            type : Boolean,
            default : true
        }
    }, { timestamps: true })
);
module.exports = fitBitUser;  

 
 
