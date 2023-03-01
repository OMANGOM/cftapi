const router = require('express').Router();
const fitBitController = require('../controller/fitBitController');
const { verifySignUp, authJwt } = require('../middleware');

router.route("/getfitbitactivity/:fromDate").get([authJwt.verifyToken], fitBitController.getActivityData);
router.route("/getdailyactivitygoal").get([authJwt.verifyToken], fitBitController.getDailyActivityGoal);
router.route("/getweeklyactivitygoal").get([authJwt.verifyToken], fitBitController.getWeeklyActivityGoal);


router.route("/getactivezoneminutes/:satrtDate/:endDate").get([authJwt.verifyToken], fitBitController.getActiveZoneMinutes);

router.route("/getactivityloglist/:fromDate").get([authJwt.verifyToken], fitBitController.getActivityLogList);

//Get All Activity Types
router.route("/getactivitytype").get([authJwt.verifyToken], fitBitController.getActivityType);

//Get Breathing Rate
router.route("/getbreathingratebydate/:onDate").get([authJwt.verifyToken], fitBitController.getBreathingRateSummaryByDate);
router.route("/getbreathingratebyinterval/:startDate/:endDate").get([authJwt.verifyToken], fitBitController.getBreathingRateSummaryByInterval);
//Get HRV Summary
router.route("/getHRVbyDate/:onDate").get([authJwt.verifyToken], fitBitController.getHRVSummarybyDate);
router.route("/getHRVbyInterval/:startDate/:endDate").get([authJwt.verifyToken], fitBitController.getHRVSummarybyInterval);


//Cardio Fitness Score (VO2 Max) forbidden error
router.route("/getVO2Maxbydate/:onDate").get([authJwt.verifyToken], fitBitController.getVO2MaxSummarybyDate);
router.route("/getVO2Maxbyinterval/:startDate/:endDate").get([authJwt.verifyToken], fitBitController.getVO2MaxSummarybyInterval);

//Get Heart Rate Time Series
router.route("/getheartratebydate/:onDate/:period").get([authJwt.verifyToken], fitBitController.getHeartRateTimeSeriesbyDate);
router.route("/getheartratebydaterange/:startDate/:endDate").get([authJwt.verifyToken], fitBitController.getHeartRateTimeSeriesbyDateRange);

//Get Get Daily Activity Summary
//getDailyActivitySummary
router.route("/getdailyactivitysummary/:onDate").get([authJwt.verifyToken], fitBitController.getDailyActivitySummary);

module.exports= router;

