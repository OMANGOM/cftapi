const router = require('express').Router();
const authController = require('../controller/authController');
const { verifySignUp, authJwt } = require('../middleware');


router
  .route("/signup")
  .post(
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    authController.signup
  );
router.route("/signin").post(authController.signIn);
router.route("/updateFitBitToken").put([authJwt.verifyToken], authController.UpdateFitbitRequestToken);
router.route("/fitBitRefreshToken").get([authJwt.verifyToken], authController.fitBitRefreshToken);

//Garmin App Authentication
router.route("/garmin/gettoken").get(authController.garminAccessToken);
router.route("/oauthauthorizeuser").get(authController.oauthAuthorizeUser);

 

module.exports = router;