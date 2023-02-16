var mongoose = require("mongoose");
const fitBitUserProfile= mongoose.model(
"fitBitUserProfile", new mongoose.Schema({
    fitBitId: String,
    
})
)