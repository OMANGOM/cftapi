const mongoose = require("mongoose");
const axios = require("axios");
const userDAO = require("../dao/userDAO");
const authConfig = require("../config/authConfig")

module.exports = {
  getActivityData: async (req, res) => {
    console.log("Date >>>>>>>>", req.params);
    if (!req.params.fromDate) {
      res.send({ message: "fromDate param is missing", success: false });
    }
    //var userData = await  userDAO.getUserData(req.userId);
    var fitBitToken = req.fitBitAccessToken;
    var fitBitUser = req.fitBitId;
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${authConfig.FITBIT_BASEURL}user/${fitBitUser}/activities/active-zone-minutes/date/${req.params.fromDate}/1m.json`,
      headers: {
        Authorization: `Bearer ${fitBitToken}`,
      },
    };
    axios(config)
      .then(function (response) {
        res.send(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error.response.status);
        console.log(error.response.statusText);
        if(error.response.statusText==="Unauthorized" || error.response.status==401){
          res.send({message:"FitBit Token Expire, Please refresh token", success: "false" })
        }else{
        res.send(error);
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
        if(error.response.statusText==="Unauthorized" || error.response.status==401){
          res.send({message:"FitBit Token Expire, Please refresh token", success: "false" })
        }else{
        res.send(error);
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
        if(error.response.statusText==="Unauthorized" || error.response.status==401){
          res.send({message:"FitBit Token Expire, Please refresh token", success: "false" })
        }else{
        res.send(error);
        }
      });
  },

  getActiveZoneMinutes: async (req, res) => {
    var fitBitToken = req.fitBitAccessToken;
    var fitBitUser = req.fitBitId;
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${authConfig.FITBIT_BASEURL}user/${fitBitUser}/activities/active-zone-minutes/date/${req.params.satrtDate}/${req.params.endDate}.json`,
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
        if(error.response.statusText==="Unauthorized" || error.response.status==401){
          res.send({message:"FitBit Token Expire, Please refresh token", success: "false" })
        }else{
        res.send(error);
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
        if(error.response.statusText==="Unauthorized" || error.response.status==401){
          res.send({message:"FitBit Token Expire, Please refresh token", success: "false" })
        }else{
        res.send(error);
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
        if(error.response.statusText==="Unauthorized" || error.response.status==401){
          res.send({message:"FitBit Token Expire, Please refresh token", success: "false" })
        }else{
        res.send(error);
        }
      });
  },
  //Get Breathing Rate Summary by Date
  //https://api.fitbit.com/1/user/GGNJL9/br/date/2021-10-04.json

  getBreathingRateSummaryByDate: async (req, res) => {
    var fitBitUser = req.fitBitId;
    var fitBitToken = req.fitBitAccessToken;
    console.log(">>>>",req.params);
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
        if(error.response.statusText==="Unauthorized" || error.response.status==401){
          res.send({message:"FitBit Token Expire, Please refresh token", success: "false" })
        }else{
        res.send(error);
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
        if(error.response.statusText==="Unauthorized" || error.response.status==401){
          res.send({message:"FitBit Token Expire, Please refresh token", success: "false" })
        }else{
        res.send(error);
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
    console.log("fitBitToken>>>",fitBitToken);
    console.log("fitBitId>>>",fitBitUser);
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
        if(error.response.statusText==="Unauthorized" || error.response.status==401){
          res.send({message:"FitBit Token Expire, Please refresh token", success: "false" })
        }else{
        res.send(error);
        }
      });
  },

  //Get VO2 Max Summary by Interval
  ///1/user/[user-id]/cardioscore/date/[start-date]/[end-date].json
  // https://api.fitbit.com/1/user/GGNJL9/cardioscore/date/2021-10-01/2021-10-04.json
  getVO2MaxSummarybyInterval: async (req, res) => {
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
        if(error.response.statusText==="Unauthorized" || error.response.status==401){
          res.send({message:"FitBit Token Expire, Please refresh token", success: "false" })
        }else{
        res.send(error);
        }
      });
  },

  //Get Heart Rate Time Series by Date Range
  ///1/user/[user-id]/activities/heart/date/[start-date]/[end-date].json
  //https://api.fitbit.com/1/user/GGNJL9/activities/heart/date/2019-01-01/2019-01-31.json
  getHeartRateTimeSeriesbyDateRange: async (req, res) => {
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
        if(error.response.statusText==="Unauthorized" || error.response.status==401){
          res.send({message:"FitBit Token Expire, Please refresh token", success: "false" })
        }else{
        res.send(error);
        }
      });
  },
  //Get Heart Rate Time Series by Date
  ///1/user/[user-id]/activities/heart/date/[date]/[period].json
  //https://api.fitbit.com/1/user/GGNJL9/activities/heart/date/today/1d.json
  //period	1d | 7d | 30d | 1w | 1m

  getHeartRateTimeSeriesbyDate: async(req, res)=>{
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
        if(error.response.statusText==="Unauthorized" || error.response.status==401){
          res.send({message:"FitBit Token Expire, Please refresh token", success: "false" })
        }else{
        res.send(error);
        }
      });
  },

  //Get HRV Summary by Interval
  // /1/user/[user-id]/hrv/date/[startDate]/[endDate].json
  // https://api.fitbit.com/1/user/GGNJL9/hrv/date/2021-10-01/2021-10-04.json
  getHRVSummarybyInterval: async (req, res) => {
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
        if(error.response.statusText==="Unauthorized" || error.response.status==401){
          res.send({message:"FitBit Token Expire, Please refresh token", success: "false" })
        }else{
        res.send(error);
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
        if(error.response.statusText==="Unauthorized" || error.response.status==401){
          res.send({message:"FitBit Token Expire, Please refresh token", success: "false" })
        }else{
        res.send(error);
        }
      });
  },
  getDailyActivitySummary: async(req, res)=>{
    var fitBitUser = req.fitBitId;
    var fitBitToken = req.fitBitAccessToken;
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
        if(error.response.statusText==="Unauthorized" || error.response.status==401){
          res.send({message:"FitBit Token Expire, Please refresh token", success: "false" })
        }else{
        res.send(error);
        }
      });
  },

};
