const { user } = require("../model");
const db = require("../model");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    if (user) {
      return res.status(400).send({ message: "Email id already taken!" });
    }
    next();
  });
};
checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    if (!ROLES.includes(req.body.roles)) {
      res.status(400).send({
        message: `Failed! Role ${req.body.roles} !`,
      });
      return;
    }
  }
  next();
};

  const verifySignUp = {
    checkDuplicateUsernameOrEmail,
    checkRolesExisted
  };
  
  module.exports = verifySignUp;