var mongoose = require("mongoose");

const categories = mongoose.model(
    "categories",
    new mongoose.Schema({
        name: String,
        id: Number,
        hasSpeed: Boolean,
        accessLevel: String,
        mets:Number,
        parentId:Number,
       
        isActive : {
            type : Boolean,
            default : true
        }
    }, { timestamps: true })
);
module.exports = categories;  