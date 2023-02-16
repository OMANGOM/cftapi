var mongoose = require("mongoose");

const fitBitUser = mongoose.model(
    "fitBitUser",
    new mongoose.Schema({
     
        user_login: String,
        fitBit_User_ID: String,
        user_Status: String,
        user_Status_TS: Date,
        req_Auth_Code_Status: String,
        req_Auth_Code_Count: Number,
        req_Auth_Code_TS : Date,
        req_Scope: String,
        approved_Scope: String,
        auth_Code: String,
        set_Auth_Code_TS: Date,
        req_Auth_Code_Errors: String,
        req_Token_Status: String,
        req_Token_Count: Number,
        req_Token_TS: Date,
        set_Token_TS: Date,
        token_Type :String,
        access_Token :String,
        token_expires_TS : Date, 
        refresh_Token :String, 
        req_Token_Errors:String,

        isActive : {
            type : Boolean,
            default : true
        }
    }, { timestamps: true })
);
module.exports = fitBitUser;  

 
 
