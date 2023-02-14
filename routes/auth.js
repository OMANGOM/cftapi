const router = require('express').Router();
const authController = require('../controller/authController');
const { verifySignUp } = require('../middleware');


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

module.exports = router;