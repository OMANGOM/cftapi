const { ConfigurationOptions } = require("aws-sdk");
const jwt = require("jsonwebtoken");
const config = require("../config/authConfig");
const db = require("../model")

verifyToken=(req, res, next) =>{
    let token = req.headers['x-access-token'];
    if(!token){
        return res.status(403).send({message:"access token not available!", isUnauthorized: true });
    }
    jwt.verify(token, config.secret, (err, decode)=>{
        if(err){
            return res.status(401).send({message:"Unauthorized access!", isUnauthorized: true });
        }
        console.log(decode);
        req.userId = decode.id;
        next();
    })

};

isAdmin = (req, res, next) => {
  console.log(req.userId);
    db.user.findById(req.userId)
    .populate("roleId", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if(user.roleId.role ==="admin"){
        return next();
      }
      return res.status(403).send({ message: "Require Admin Role!" });
      
    });
  };
  const authJwt = { verifyToken, isAdmin };
  module.exports = authJwt;
