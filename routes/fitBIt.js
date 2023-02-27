const router = require('express').Router();
const fitBitController = require('../controller/fitBitController');
const { verifySignUp, authJwt } = require('../middleware');

router.route("/getfitbitactivity/:fromDate").get([authJwt.verifyToken], fitBitController.getActivityData);
router.route("/getdailyactivitygoal").get([authJwt.verifyToken], fitBitController.getDailyActivityGoal);
router.route("/getweeklyactivitygoal").get([authJwt.verifyToken], fitBitController.getWeeklyActivityGoal);
router.route("/getactivezoneminutes/:satrtDate/:endDate").get([authJwt.verifyToken], fitBitController.getActiveZoneMinutes);

router.route("/getactivityloglist/:fromDate").get([authJwt.verifyToken], fitBitController.getActivityLogList);


module.exports= router;

