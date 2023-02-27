const db = require("../model");
const bcrypt = require("bcrypt");
const { role, mongoose } = require("../model");
const User = db.user;
const Role = db.role;
module.exports = {
  seedUser: async () => {
    
    const rr  = await  Role.findOne({ role: 'admin' });
    db.user.estimatedDocumentCount( (err, count) => {
      if (!err && count === 0) {
         Role.findOne({role:'admin'},(err, roles) => {
          if (err) {
            return err;
          } else {
            if (roles) {
              new User({
                userId: "admin",
                fullName: "admin",
                email: "rajan.kumar@outlook.com",
                password: bcrypt.hashSync("Test@123", 8),
                roleId: mongoose.Types.ObjectId(rr._id),
              }).save((err, User) => {
                if (err) return { message: "error in user creation" }, err;
                return User;
              });
            }
          }
        });
      }
    });
  },
};
