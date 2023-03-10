const db = require("../model");
module.exports = {

  createToken: (emailId) => {
    return db.user.findOne({
      email: emailId,
    }).then((user, err) => {
      if (err)
        return {
          success: false,
          message: "User Not Found.",
        };
      var token = jwt.sign(
        {
          userId: user._id,
          email: user.email,
          fitBitAccessToken: user.fitBitAccessToken,
          fitBitId: user.fitBitId,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        authConfig.secret,
        {
          expiresIn: 86400 * 30, // 1 month
        }
      );
      return {
        success: true,
        message: "Token create successfully.",
        token: token,
      };
    });
  },

  
updateAccessToken:(accessToken, refreshToken,expires_in, profile)=>{

    // console.log("accessToken",accessToken);
    // console.log("refreshToken",refreshToken);
     console.log("profile",profile);
    
    // db.user.updateOne()
    
    },


}