const config = require("../config/authConfig");
const mongoose = require("mongoose");
const db = require("../model");
const User = db.user;
const Role = db.role;
const axios= require("axios");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");



exports.signIn = (req, res) => {
    User.findOne({
      email: req.body.email
    })
      .populate("roleId", "-__v")
      .exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
  
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
  
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
  
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }
  
        var token = jwt.sign({ email: user.email, firstName: user.firstName, lastName: user.lastName }, config.secret, {
          expiresIn: (86400 * 30) // 1 month
        });
  
        // var authorities = [];
  
        // for (let i = 0; i < user.roles.length; i++) {
        //   authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
        // }
        res.status(200).send({
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          roles: user.roleId.role,
          accessToken: token
        });
      });
  };
exports.signup = (req, res) => {
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      dob: req.body.dob,
      fitBitId:req.body.fitBitId
    });
    Role.findOne({ role: req.body.roles }, (err, roles) => {
      if (err) {
        console.log("roles could not found >>>", err);
        console.log("Role: <<<", roles);
      }
      console.log(roles);
      if (roles) {
        user.roleId = mongoose.Types.ObjectId(roles._id);
      }
    });
    user.save((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
  
      if (req.body.roles) {
        Role.find(
          {
            role: { $in: req.body.roles }
          },
          (err, roles) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
  
            user.roles = roles.map(role => role._id);
            user.save(err => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
  
              res.send({ message: "User registered successfully!" });
            });
          }
        );
      } else {
        Role.findOne({ role: "user" }, (err, role) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
  
          user.roles = [role._id];
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
  
            res.send({ message: "User registered successfully!" });
          });
        });
      }
    });
  };

