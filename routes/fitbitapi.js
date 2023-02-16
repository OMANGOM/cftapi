const router = require('express').Router();
const fitBitApiController = require('../controller/fibBitApiController');


router
  .route("/fibBitApi")
  .post(fitBitApiController.postFitBit)
  .get(fitBitApiController.getFitBitApi);
router.route("/fibitcallback?code").get(fitBitApiController.fibitcallback);

module.exports = router;