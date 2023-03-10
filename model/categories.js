var mongoose = require("mongoose");

const categories = mongoose.model(
    "categories",
    new mongoose.Schema({
        name: String,
        id: Number,  
        parentId:Number,
        isActive : {
            type : Boolean,
            default : true
        }
    }, { timestamps: true })
);
module.exports = categories;  