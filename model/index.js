const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.mongoose.set("strictQuery", false);
db.user = require('./user');
db.role = require('./role');
db.fitBitApi = require('./fitBitApi');
db.fitBitUser= require('./fitBitUser');
db.fitBitUserProfile= require('./fitBitUserProfile');
db.session = require('./session');

db.ROLES = ["user", "admin"];
module.exports = db;
