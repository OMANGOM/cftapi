const authConfig = require("../config/authConfig");
const mongoose = require("mongoose");
const db = require("../model");
const User = db.user;
const Role = db.role;
const axios= require("axios");
const request = require('request');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const qs = require('qs');
const userDAO = require('../dao/userDAO') ;

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
  
        var token = jwt.sign({userId:user._id, email: user.email, fitBitAccessToken: user.fitBitAccessToken, fitBitId:user.fitBitId , firstName: user.firstName, lastName: user.lastName }, config.secret, {
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

exports.garminAccessToken= (req, res)=>{

  // Omangom
  // Consumer Key	:  10dc2e28-231c-4b27-b82c-112ea9878414
  // Consumer Secret :	9rDhY9KfzDkiVx5X3hFnrONlTqjDcn7PgHp
  request.post({
    // The url to get the request token from.
    url: "https://connectapi.garmin.com/oauth-service/oauth/request_token",
    oauth: {
        callback: "http://localhost:3000/api/auth/oauthauthorizeuser",
        consumer_key: "10dc2e28-231c-4b27-b82c-112ea9878414",
        consumer_secret: "9rDhY9KfzDkiVx5X3hFnrONlTqjDcn7PgHp"
    }
}, (err, rs, body) => {
  console.log(body);
    var bodyObject = qs.parse(body);
    console.log(bodyObject.oauth_token);
    res.send({
      message:"authenticated successfully",
      url: "https://connect.garmin.com/oauthConfirm?oauth_token=" + bodyObject.oauth_token
    });
})

};

exports.oauthAuthorizeUser =(req, res)=>{
console.log("TTTTTTT",req.query);
//https://apis.garmin.com/tools/oauthAuthorizeUser?action=step3&oauth_token=668089e6-5c20-4c17-b368-1cb3e895fd54&oauth_verifier=Lnef9ylY2o
//var bodyObject = qs.parse(body);

var authToken = req.query.oauth_token;
var authVerifier= req.query.oauth_verifier;
request.post({
  url: `https://apis.garmin.com/tools/oauthAuthorizeUser?action=step3&oauth_token=${authToken}&oauth_verifier=${authVerifier}`,
  
}, (err, rs, body) => {
  res.send({
    message:"authenticated successfully",
    url: "https://connect.garmin.com/oauthConfirm?oauth_token=" 
  });
})
//res.send({message:"success"});
};

 
exports.UpdateFitbitRequestToken=(req, res)=>{
  //req.userId 
  const date = new Date()
  
  console.log(req.userId);
  var userData={};
  userData.fitBitId= req.body.user_id;
  userData.fitBitAccessToken= req.body.access_token;
  userData.fitBitRefreshToken= req.body.refreshToken;
  userData.fitBitTokenExpiry= date.setSeconds(date.getSeconds() + req.body.expires_in);
  userData.fitBitScope= req.body.scope;
  userData.fitBitTokenType= req.body.token_type;

  userDAO.updateUser(req.userId, userData).then((response)=>{
    res.send(response);
  });

 
};

exports.fitBitRefreshToken=async (req, res)=>{
var userData = await  userDAO.getUserData(req.userId);
var refreshToken = userData.data.fitBitRefreshToken;
  var config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `https://api.fitbit.com/oauth2/token?grant_type=refresh_token&refresh_token=${refreshToken}&client_id=${authConfig.CONSUMER_KEY}`,
    headers: {
      Authorization: `Basic ${authConfig.BASIC_TOKEN}`,
    },
  };
  console.log("config",config);
   axios(config)
    .then(function (response) {
        console.log(response);
      res.send(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
      res.send(error);
    });
};


