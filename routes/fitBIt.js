const router = require('express').Router();
const fitBitController = require('../controller/fitBitController');
const { verifySignUp, authJwt } = require('../middleware');

//getFitBitUserProfile
router.route("/getfitBitUserProfile").get([authJwt.verifyToken], fitBitController.getFitBitUserProfile);
//Get Fit Bit category and Activity level
router.route("/getfitbitcategories").get([authJwt.verifyToken], fitBitController.getFitBitCategories);

router.route("/getfitbitactivity/:fromDate").get([authJwt.verifyToken], fitBitController.getActivityData);
router.route("/getdailyactivitygoal").get([authJwt.verifyToken], fitBitController.getDailyActivityGoal);
router.route("/getweeklyactivitygoal").get([authJwt.verifyToken], fitBitController.getWeeklyActivityGoal);


router.route("/getactivezoneminutes/:startDate/:endDate").get([authJwt.verifyToken], fitBitController.getActiveZoneMinutes);

router.route("/getactivityloglist/:fromDate").get([authJwt.verifyToken], fitBitController.getActivityLogList);

//Get All Activity Types
router.route("/getactivitytype").get([authJwt.verifyToken], fitBitController.getActivityType);

//Get Breathing Rate
router.route("/getbreathingratebydate/:onDate").get([authJwt.verifyToken], fitBitController.getBreathingRateSummaryByDate);
router.route("/getbreathingratebyinterval/:startDate/:endDate").get([authJwt.verifyToken], fitBitController.getBreathingRateSummaryByInterval);
//Get HRV Summary
router.route("/getHRVbyDate/:onDate").get([authJwt.verifyToken], fitBitController.getHRVSummarybyDate);
router.route("/getHRVbyInterval/:startDate/:endDate").get([authJwt.verifyToken], fitBitController.getHRVSummaryByInterval);


//Cardio Fitness Score (VO2 Max) forbidden error
router.route("/getVO2Maxbydate/:onDate").get([authJwt.verifyToken], fitBitController.getVO2MaxSummarybyDate);
router.route("/getVO2maxbyinterval/:startDate/:endDate").get([authJwt.verifyToken], fitBitController.getVO2MaxSummaryByInterval);

//Get Heart Rate Time Series
router.route("/getheartratebydate/:onDate/:period").get([authJwt.verifyToken], fitBitController.getHeartRateTimeSeriesByDate);
router.route("/getheartratebydaterange/:startDate/:endDate").get([authJwt.verifyToken], fitBitController.getHeartRateTimeSeriesByDateRange);

//Get Get Daily Activity Summary
//getDailyActivitySummary
router.route("/getdailyactivitysummary/:onDate").get([authJwt.verifyToken], fitBitController.getDailyActivitySummary);

//Get AZM Intraday by Date
//https://api.fitbit.com/1/user/GGNJL9/activities/active-zone-minutes/date/2022-01-01/1d/1min/time/08:00/08:30.json
router.route("/getAZMintradaybydate/:onDate/:startTime/:endTime").get([authJwt.verifyToken], fitBitController.getAZMIntraDayByDate);

//updateFitBitActiveZoneMinutes
router.route("/updatefitbitactivezoneminutes/:fitBitId/:startDate/:endDate").get([authJwt.verifyToken], fitBitController.updateFitBitActiveZoneMinutes);

router.route("/updatefitbitheartrate/:fitbitId/:startdate/:enddate").get([authJwt.verifyToken], fitBitController.updateFitBitHeartRate);


module.exports= router;

