const mongoose = require("mongoose");
const axios = require("axios");
const userDAO = require("../dao/userDAO");
const authConfig = require("../config/authConfig");
const CategroriesDao = require("../dao/categoryDAO.js");
const categoryDAO = require("../dao/categoryDAO.js");
const activeZoneMinutesDAO= require("../dao/activeZoneMinutesDAO");
const heartActivitiesDAO = require('../dao/heartActivitiesDAO');
module.exports = {
  getFitBitUserProfile: async (req, res) => {
    var fitBitToken = req.fitBitAccessToken;
    //https://api.fitbit.com/1/user/-/profile.json
    var fitBitUser = req.fitBitId;
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${authConfig.FITBIT_BASEURL}user/${fitBitUser}/profile.json`,
      headers: {
        Authorization: `Bearer ${fitBitToken}`,
      },
    };
    axios(config)
      .then(function (response) {
        res.send(JSON.stringify(response.data));
      })
      .catch(function (error) {
        if (
          error.response.statusText === "Unauthorized" ||
          error.response.status == 401
        ) {
          res.send({
            message: "FitBit Token Expire, Please refresh token",
            success: "false",
          });
        } else {
          res.send({ success: "false", message: error.response.data });
        }
      });
  },
  getActivityData: async (req, res) => {
    if (!req.params.fromDate) {
      res.send({ message: "fromDate param is missing", success: false });
    }
    //var userData = await  userDAO.getUserData(req.userId);
    var fitBitToken = req.fitBitAccessToken;
    var fitBitUser = req.fitBitId;
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${authConfig.FITBIT_BASEURL}user/${fitBitUser}/activities/active-zone-minutes/date/${req.params.fromDate}/1w.json`,
      headers: {
        Authorization: `Bearer ${fitBitToken}`,
      },
    };
    axios(config)
      .then(function (response) {
        res.send(JSON.stringify(response.data));
      })
      .catch(function (error) {
        if (
          error.response.statusText === "Unauthorized" ||
          error.response.status == 401
        ) {
          res.send({
            message: "FitBit Token Expire, Please refresh token",
            success: "false",
          });
        } else {
          res.send({ success: "false", message: error.response.data });
        }
      });
  },

  getDailyActivityGoal: async (req, res) => {
    var fitBitToken = req.fitBitAccessToken;
    var fitBitUser = req.fitBitId;
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${authConfig.FITBIT_BASEURL}user/${fitBitUser}/activities/goals/daily.json`,
      headers: {
        Authorization: `Bearer ${fitBitToken}`,
      },
    };
    console.log("config", config);
    axios(config)
      .then(function (response) {
        res.send(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error.response.status);
        console.log(error.response.statusText);
        if (
          error.response.statusText === "Unauthorized" ||
          error.response.status == 401
        ) {
          res.send({
            message: "FitBit Token Expire, Please refresh token",
            success: "false",
          });
        } else {
          res.send({ success: "false", message: error.response.data });
        }
      });
  },

  getWeeklyActivityGoal: async (req, res) => {
    var fitBitToken = req.fitBitAccessToken;
    var fitBitUser = req.fitBitId;
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${authConfig.FITBIT_BASEURL}user/${fitBitUser}/activities/goals/weekly.json`,
      headers: {
        Authorization: `Bearer ${fitBitToken}`,
      },
    };
    console.log("config", config);
    axios(config)
      .then(function (response) {
        res.send(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error.response.status);
        console.log(error.response.statusText);
        if (
          error.response.statusText === "Unauthorized" ||
          error.response.status == 401
        ) {
          res.send({
            message: "FitBit Token Expire, Please refresh token",
            success: "false",
          });
        } else {
          res.send({ success: "false", message: error.response.data });
        }
      });
  },

  getActiveZoneMinutes: async (req, res) => {
    var fitBitToken = req.fitBitAccessToken;
    var fitBitUser = req.fitBitId;
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${authConfig.FITBIT_BASEURL}user/${fitBitUser}/activities/active-zone-minutes/date/${req.params.startDate}/${req.params.endDate}.json`,
      headers: {
        Authorization: `Bearer ${fitBitToken}`,
      },
    };
    console.log("config", config);
    axios(config)
      .then(function (response) {
        res.send(JSON.stringify(response.data));
      })
      .catch(function (error) {
        if (
          error.response.statusText === "Unauthorized" ||
          error.response.status == 401
        ) {
          res.send({
            message: "FitBit Token Expire, Please refresh token",
            success: "false",
          });
        } else {
          res.send({ success: "false", message: error.response.data });
        }
      });
  },

  getActivityLogList: async (req, res) => {
    var fitBitToken = req.fitBitAccessToken;
    var fitBitUser = req.fitBitId;
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${authConfig.FITBIT_BASEURL}user/${fitBitUser}/activities/list.json?afterDate=${req.params.fromDate}&sort=asc&offset=0&limit=30`,
      headers: {
        Authorization: `Bearer ${fitBitToken}`,
      },
    };
    console.log("config", config);
    axios(config)
      .then(function (response) {
        res.send(JSON.stringify(response.data));
      })
      .catch(function (error) {
        if (
          error.response.statusText === "Unauthorized" ||
          error.response.status == 401
        ) {
          res.send({
            message: "FitBit Token Expire, Please refresh token",
            success: "false",
          });
        } else {
          res.send({ success: "false", message: error.response.data });
        }
      });
  },

  //Get All Activity Types
  getActivityType: async (req, res) => {
    //	/1/activities/[activity-id].json
    var fitBitUser = req.fitBitId;
    var fitBitToken = req.fitBitAccessToken;
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${authConfig.FITBIT_BASEURL}activities.json`,
      headers: {
        Authorization: `Bearer ${fitBitToken}`,
      },
    };
    console.log("config", config);
    axios(config)
      .then(function (response) {
        res.send(JSON.stringify(response.data));
      })
      .catch(function (error) {
        if (
          error.response.statusText === "Unauthorized" ||
          error.response.status == 401
        ) {
          res.send({
            message: "FitBit Token Expire, Please refresh token",
            success: "false",
          });
        } else {
          res.send({ success: "false", message: error.response.data });
        }
      });
  },
  //Get Breathing Rate Summary by Date
  //https://api.fitbit.com/1/user/GGNJL9/br/date/2021-10-04.json

  getBreathingRateSummaryByDate: async (req, res) => {
    var fitBitUser = req.fitBitId;
    var fitBitToken = req.fitBitAccessToken;
    console.log(">>>>", req.params);
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${authConfig.FITBIT_BASEURL}user/${fitBitUser}/br/date/${req.params.onDate}.json`,
      headers: {
        Authorization: `Bearer ${fitBitToken}`,
      },
    };
    console.log("config", config);
    axios(config)
      .then(function (response) {
        res.send(JSON.stringify(response.data));
      })
      .catch(function (error) {
        if (
          error.response.statusText === "Unauthorized" ||
          error.response.status == 401
        ) {
          res.send({
            message: "FitBit Token Expire, Please refresh token",
            success: "false",
          });
        } else {
          res.send({ success: "false", message: error.response.data });
        }
      });
  },

  //Get Breathing Rate Summary by Interval
  // /1/user/[user-id]/br/date/[start-date]/[end-date].json
  //https://api.fitbit.com/1/user/GGNJL9/br/date/2021-10-01/2021-10-04.json
  getBreathingRateSummaryByInterval: async (req, res) => {
    var fitBitUser = req.fitBitId;
    var fitBitToken = req.fitBitAccessToken;
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${authConfig.FITBIT_BASEURL}user/${fitBitUser}/br/date/${req.params.startDate}/${req.params.endDate}.json`,
      headers: {
        Authorization: `Bearer ${fitBitToken}`,
      },
    };
    console.log("config", config);
    axios(config)
      .then(function (response) {
        res.send(JSON.stringify(response.data));
      })
      .catch(function (error) {
        if (
          error.response.statusText === "Unauthorized" ||
          error.response.status == 401
        ) {
          res.send({
            message: "FitBit Token Expire, Please refresh token",
            success: "false",
          });
        } else {
          res.send({ success: "false", message: error.response.data });
        }
      });
  },

  //Get VO2 Max Summary by Date
  //-- /1/user/[user-id]/cardioscore/date/[date].json
  //https://api.fitbit.com/1/user/GGNJL9/cardioscore/date/2021-10-04.json
  //https://api.fitbit.com/1/user/5HL72X/cardioscore/date/2023-02-10.json
  getVO2MaxSummarybyDate: async (req, res) => {
    var fitBitUser = req.fitBitId;
    var fitBitToken = req.fitBitAccessToken;
    console.log("fitBitToken>>>", fitBitToken);
    console.log("fitBitId>>>", fitBitUser);
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${authConfig.FITBIT_BASEURL}user/${fitBitUser}/cardioscore/date/${req.params.onDate}.json`,
      headers: {
        Authorization: `Bearer ${fitBitToken}`,
      },
    };
    console.log("config", config);
    axios(config)
      .then(function (response) {
        res.send(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error.response.data);
        if (
          error.response.statusText === "Unauthorized" ||
          error.response.status == 401
        ) {
          res.send({
            message: "FitBit Token Expire, Please refresh token",
            success: "false",
          });
        } else {
          res.send({ success: "false", message: error.response.data });
        }
      });
  },

  //Get VO2 Max Summary by Interval
  ///1/user/[user-id]/cardioscore/date/[start-date]/[end-date].json
  // https://api.fitbit.com/1/user/GGNJL9/cardioscore/date/2021-10-01/2021-10-04.json
  getVO2MaxSummaryByInterval: async (req, res) => {
    var fitBitUser = req.fitBitId;
    var fitBitToken = req.fitBitAccessToken;
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${authConfig.FITBIT_BASEURL}user/${fitBitUser}/cardioscore/date/${req.params.startDate}/${req.params.endDate}.json`,
      headers: {
        Authorization: `Bearer ${fitBitToken}`,
      },
    };
    console.log("config", config);
    axios(config)
      .then(function (response) {
        res.send(JSON.stringify(response.data));
      })
      .catch(function (error) {
        if (
          error.response.statusText === "Unauthorized" ||
          error.response.status == 401
        ) {
          res.send({
            message: "FitBit Token Expire, Please refresh token",
            success: "false",
          });
        } else {
          res.send({ success: "false", message: error.response.data });
        }
      });
  },

  //Get Heart Rate Time Series by Date Range
  ///1/user/[user-id]/activities/heart/date/[start-date]/[end-date].json
  //https://api.fitbit.com/1/user/GGNJL9/activities/heart/date/2019-01-01/2019-01-31.json
  getHeartRateTimeSeriesByDateRange: async (req, res) => {
    var fitBitUser = req.fitBitId;
    var fitBitToken = req.fitBitAccessToken;
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${authConfig.FITBIT_BASEURL}user/${fitBitUser}/activities/heart/date/${req.params.startDate}/${req.params.endDate}.json`,
      headers: {
        Authorization: `Bearer ${fitBitToken}`,
      },
    };
    console.log("config", config);
    axios(config)
      .then(function (response) {
        res.send(JSON.stringify(response.data));
      })
      .catch(function (error) {
        if (
          error.response.statusText === "Unauthorized" ||
          error.response.status == 401
        ) {
          res.send({
            message: "FitBit Token Expire, Please refresh token",
            success: "false",
          });
        } else {
          res.send({ success: "false", message: error.response.data });
        }
      });
  },
  //Get Heart Rate Time Series by Date
  ///1/user/[user-id]/activities/heart/date/[date]/[period].json
  //https://api.fitbit.com/1/user/GGNJL9/activities/heart/date/today/1d.json
  //period	1d | 7d | 30d | 1w | 1m

  getHeartRateTimeSeriesByDate: async (req, res) => {
    var fitBitUser = req.fitBitId;
    var fitBitToken = req.fitBitAccessToken;
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${authConfig.FITBIT_BASEURL}user/${fitBitUser}/activities/heart/date/${req.params.onDate}/${req.params.period}.json`,
      headers: {
        Authorization: `Bearer ${fitBitToken}`,
      },
    };
    console.log("config", config);
    axios(config)
      .then(function (response) {
        res.send(JSON.stringify(response.data));
      })
      .catch(function (error) {
        if (
          error.response.statusText === "Unauthorized" ||
          error.response.status == 401
        ) {
          res.send({
            message: "FitBit Token Expire, Please refresh token",
            success: "false",
          });
        } else {
          res.send({ success: "false", message: error.response.data });
        }
      });
  },

  //Get HRV Summary by Interval
  // /1/user/[user-id]/hrv/date/[startDate]/[endDate].json
  // https://api.fitbit.com/1/user/GGNJL9/hrv/date/2021-10-01/2021-10-04.json
  getHRVSummaryByInterval: async (req, res) => {
    var fitBitUser = req.fitBitId;
    var fitBitToken = req.fitBitAccessToken;
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${authConfig.FITBIT_BASEURL}user/${fitBitUser}/hrv/date/${req.params.startDate}/${req.params.endDate}.json`,
      headers: {
        Authorization: `Bearer ${fitBitToken}`,
      },
    };
    console.log("config", config);
    axios(config)
      .then(function (response) {
        res.send(JSON.stringify(response.data));
      })
      .catch(function (error) {
        if (
          error.response.statusText === "Unauthorized" ||
          error.response.status == 401
        ) {
          res.send({
            message: "FitBit Token Expire, Please refresh token",
            success: "false",
          });
        } else {
          res.send({ success: "false", message: error.response.data });
        }
      });
  },

  //Get HRV Summary by Date
  ///1/user/[user-id]/hrv/date/[date].json
  // https://api.fitbit.com/1/user/GGNJL9/hrv/date/2021-10-04.json
  getHRVSummarybyDate: async (req, res) => {
    var fitBitUser = req.fitBitId;
    var fitBitToken = req.fitBitAccessToken;
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${authConfig.FITBIT_BASEURL}user/${fitBitUser}/hrv/date/${req.params.onDate}.json`,
      headers: {
        Authorization: `Bearer ${fitBitToken}`,
      },
    };
    console.log("config", config);
    axios(config)
      .then(function (response) {
        res.send(JSON.stringify(response.data));
      })
      .catch(function (error) {
        if (
          error.response.statusText === "Unauthorized" ||
          error.response.status == 401
        ) {
          res.send({
            message: "FitBit Token Expire, Please refresh token",
            success: "false",
          });
        } else {
          res.send({ success: "false", message: error.response.data });
        }
      });
  },
  getDailyActivitySummary: async (req, res) => {
    var fitBitUser = req.fitBitId;
    var fitBitToken = req.fitBitAccessToken;
    console.log(req.fitBitId, "VVVVV", req.fitBitAccessToken);
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${authConfig.FITBIT_BASEURL}user/${fitBitUser}/activities/date/${req.params.onDate}.json`,
      headers: {
        Authorization: `Bearer ${fitBitToken}`,
      },
    };
    console.log("config", config);
    axios(config)
      .then(function (response) {
        res.send(JSON.stringify(response.data));
      })
      .catch(function (error) {
        if (
          error.response.statusText === "Unauthorized" ||
          error.response.status == 401
        ) {
          res.send({
            message: "FitBit Token Expire, Please refresh token",
            success: "false",
          });
        } else {
          res.send({ success: "false", message: error.response.data });
        }
      });
  },

  //Get AZM Intraday by Date
  //https://api.fitbit.com/1/user/GGNJL9/activities/active-zone-minutes/date/2022-01-01/1d/1min/time/08:00/08:30.json
  getAZMIntraDayByDate: async (req, res) => {
    var fitBitUser = req.fitBitId;
    var fitBitToken = req.fitBitAccessToken;
    console.log(req.fitBitId, "VVVVV", req.fitBitAccessToken);
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${authConfig.FITBIT_BASEURL}user/${fitBitUser}/activities/active-zone-minutes/date/${req.params.onDate}/1d/1min/time/${req.params.startTime}/${req.params.endTime}.json`,
      headers: {
        Authorization: `Bearer ${fitBitToken}`,
      },
    };
    console.log("config", config);
    axios(config)
      .then(function (response) {
        console.log(response.data);
        res.send(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
        if (
          error.response.statusText === "Unauthorized" ||
          error.response.status == 401
        ) {
          res.send({
            message: "FitBit Token Expire, Please refresh token",
            success: "false",
          });
        } else {
          res.send({ success: "false", message: error.response.data });
        }
      });
  },
  //Get FitBit Categories
  getFitBitCategories: async (req, res) => {
    var fitBitToken = req.fitBitAccessToken;
    //https://api.fitbit.com/1/user/-/profile.json
    var fitBitUser = req.fitBitId;
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${authConfig.FITBIT_BASEURL}activities.json`,
      headers: {
        Authorization: `Bearer ${fitBitToken}`,
      },
    };
    console.log(config);
    axios(config)
      .then(function (response) {
        //console.log(response);
        let CategoriesData = [];
        CategoriesData = response.data.categories;
        console.log(CategoriesData.length);
        //const categories= new Map();
        //var promises = [];

        const numbers = CategoriesData;

        const asyncOperation = (category) => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              let categoryData = {
                id: category.id,
                name: category.name,
              };
              var cat = categoryDAO.addCategory(categoryData);
              //console.log(cat);

              if (category.activities && category.activities.length >= 1) {
                let activity = [];
                activity = category.activities;
                activity.map((activityElement) => {
                  let activities = {
                    id: activityElement.id,
                    accessLevel: activityElement.accessLevel,
                    hasSpeed: activityElement.hasSpeed,
                    name: activityElement.name,
                    categoryId: category.id,
                  };
                  var resActivity = categoryDAO.addActivity(activities);
                  console.log(resActivity);

                  if (
                    activityElement.activityLevels &&
                    activityElement.activityLevels.length >= 1
                  ) {
                    let activityLevelList = [];
                    activityLevelList = activityElement.activityLevels;
                    activityLevelList.map((activityLevelListElement) => {
                      let activityLevel = {
                        id: activityLevelListElement.id,
                        maxSpeedMPH: activityLevelListElement.maxSpeedMPH,
                        mets: activityLevelListElement.mets,
                        minSpeedMPH: activityLevelListElement.minSpeedMPH,
                        name: activityLevelListElement.name,
                        parentId: activityElement.id,
                      };
                      var resActivityLevel =
                        categoryDAO.addActivityLevel(activityLevel);
                      console.log(resActivityLevel);
                    });
                  }
                });
              }

              if (
                category.subCategories &&
                category.subCategories.length >= 1
              ) {
                let subCategories = [];
                subCategories = category.subCategories;
                subCategories.map((subCat) => {
                  // console.log("Categories >>", category.id);
                  // console.log("subCategories >>", subCat.id);
                  let SubCategoryData = {
                    id: subCat.id,
                    name: subCat.name,
                    parentId: category.id,
                  };
                  var cat = categoryDAO.addCategory(SubCategoryData);
                  console.log(cat);
                });
              }

              resolve(); // Double the number
            }, 1000);
          });
        };

        const promises = CategoriesData.map((category) =>
          asyncOperation(category)
        );

        Promise.all(promises)
          .then((results) => {
            // console.log(results); // [2, 4, 6, 8, 10]
            res.send(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch(function (error) {
        res.send({ success: "false", message: error });
      });
  },

  updateFitBitActiveZoneMinutes: async (req, res) => {
    var userDetails = await userDAO.getUserDataByFitBitId(req.params.fitBitId);
    var fitBitToken = userDetails.data.fitBitAccessToken;
    var fitBitUser = userDetails.data.fitBitId;
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${authConfig.FITBIT_BASEURL}user/${fitBitUser}/activities/active-zone-minutes/date/${req.params.startDate}/${req.params.endDate}.json`,
      headers: {
        Authorization: `Bearer ${fitBitToken}`,
      },
    };
    console.log("config", config);
    axios(config)
      .then(function (response) {
        var ActiveZoneMinutesList = [];
        ActiveZoneMinutesList = response.data;
        var strJson = JSON.stringify(response.data);
        strJson = strJson.replace(
          "activities-active-zone-minutes",
          "activities_active_zone_minutes"
        );
        ActiveZoneMinutesList =
          JSON.parse(strJson).activities_active_zone_minutes;
        const asyncOperation = (addActiveZoneMinutesData) => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              console.log("<<<", addActiveZoneMinutesData, ">>>");
              let ActiveZoneMinutesData = {
                fitBitId: fitBitUser,
                fatBurnActiveZoneMinutes:
                  addActiveZoneMinutesData.value.fatBurnActiveZoneMinutes,
                cardioActiveZoneMinutes:
                  addActiveZoneMinutesData.value.cardioActiveZoneMinutes,
                activeZoneMinutes:
                  addActiveZoneMinutesData.value.activeZoneMinutes,
                peakActiveZoneMinutes:
                  addActiveZoneMinutesData.value.peakActiveZoneMinutes,
                onDateTime: addActiveZoneMinutesData.dateTime,
              };
              var cat = activeZoneMinutesDAO.addActiveZoneMinutes(
                ActiveZoneMinutesData
              );
              resolve(); 
            }, 1000);
          });
        };
        const promises = ActiveZoneMinutesList.map((addActiveZoneMinutesData) =>
          asyncOperation(addActiveZoneMinutesData)
        );
        Promise.all(promises)
          .then((results) => {
            res.send(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch(function (error) {
        console.error(error);
        if (
          error.response &&
          (error.response.statusText === "Unauthorized" ||
            error.response.status == 401)
        ) {
          res.send({
            message: "FitBit Token Expire, Please refresh token",
            success: "false",
          });
        } else {
          res.send({ success: "false", message: error.response });
        }
      });
  },

  updateFitBitHeartRate: async(req, res)=>{
    var userDetails = await userDAO.getUserDataByFitBitId(req.params.fitbitId);
   // var userDetails = await userDAO.getUserData(user.data._id);


    console.log(userDetails,"---------------");
     var fitBitToken = userDetails.data.fitBitAccessToken;
     var fitBitUser = userDetails.data.fitBitId;
    console.log(fitBitToken, "VVVVV", fitBitUser);
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${authConfig.FITBIT_BASEURL}user/${fitBitUser}/activities/heart/date/${req.params.startdate}/${req.params.enddate}.json`,
      headers: {
        Authorization: `Bearer ${fitBitToken}`,
      },
    };
    console.log("config", config);
    axios(config)
      .then(function (response) {
        var activityList  = [];
        //var activityList   = response.data;
        var strJson = JSON.stringify(response.data);
        strJson = strJson.replace(
          "activities-heart",
          "activities_heart"
        );
        activityList=  JSON.parse(strJson).activities_heart;

        const asyncOperation = (activitiesElement) => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              var heartRateZones=[];
              if(activitiesElement.value.heartRateZones.length >=1 ){
                activitiesElement.value.heartRateZones.map(element=>{
                  console.log(element);
                  heartRateZones.push(element);
                })
              
              }
              var HeartActivityData={
                fitBitId: fitBitUser,
                onDateTime: activitiesElement.dateTime,
                restingHeartRate: activitiesElement.value.restingHeartRate,
                heartRateZones: heartRateZones,
              }
    
              heartActivitiesDAO.addHeartActivities(HeartActivityData);
              resolve(); 
            }, 1000);
          });
        };



        const promises = activityList.map((activitiesElement) =>
          asyncOperation(activitiesElement)
        );
        Promise.all(promises)
          .then((results) => {
            res.send(response.data);
          })
          .catch((error) => {
            console.error(error);
          });




      })
      .catch(function (error) {
        if (error.response && (
          error.response.statusText === "Unauthorized" ||
          error.response.status == 401)
        ) {
          res.send({
            message: "FitBit Token Expire, Please refresh token",
            success: "false",
          });
        } else {
          res.send({ success: "false", message: error.response });
        }
      });
  },
};
