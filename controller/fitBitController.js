const mongoose = require("mongoose");
const axios = require("axios");
const userDAO = require("../dao/userDAO");
const authConfig = require("../config/authConfig")

module.exports = {
  getActivityData: async (req, res) => {
    console.log("Date >>>>>>>>",req.params)
    if(!req.params.fromDate){
      res.send({message:"fromDate param is missing", success:false});
    }
  
    var userData = await  userDAO.getUserData(req.userId);

    var fitBitToken =req.fitBitAccessToken;
    var fitBitUser = req.fitBitId;
      var config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${authConfig.FITBIT_BASEURL}user/${fitBitUser}/activities/active-zone-minutes/date/${req.params.fromDate}/1m.json`,
        headers: {
          Authorization: `Bearer ${fitBitToken}`,
        },
      };
      console.log("config",config);
       axios(config)
        .then(function (response) {
            console.log(response);
          res.send(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
          res.send(error);
        });

  },

  getDailyActivityGoal: async(req,res)=>{
    var fitBitToken =req.fitBitAccessToken;
    var fitBitUser = req.fitBitId;
    var config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${authConfig.FITBIT_BASEURL}user/${fitBitUser}/activities/goals/daily.json`,
        headers: {
          Authorization: `Bearer ${fitBitToken}`,
        },
      };
      console.log("config",config);
       axios(config)
        .then(function (response) {
          res.send(JSON.stringify(response.data));
        })
        .catch(function (error) {
          res.send(error);
        });
  },

  getWeeklyActivityGoal:async(req,res)=>{
    var fitBitToken =req.fitBitAccessToken;
    var fitBitUser = req.fitBitId;
    var config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${authConfig.FITBIT_BASEURL}user/${fitBitUser}/activities/goals/weekly.json`,
        headers: {
          Authorization: `Bearer ${fitBitToken}`,
        },
      };
      console.log("config",config);
       axios(config)
        .then(function (response) {
          res.send(JSON.stringify(response.data));
        })
        .catch(function (error) {
          res.send(error);
        });
  },


  getActiveZoneMinutes : async(req, res)=>{
    var fitBitToken =req.fitBitAccessToken;
    var fitBitUser = req.fitBitId;
    var config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${authConfig.FITBIT_BASEURL}user/${fitBitUser}/activities/active-zone-minutes/date/${req.params.satrtDate}/${req.params.endDate}.json`,
        headers: {
          Authorization: `Bearer ${fitBitToken}`,
        },
      };
      console.log("config",config);
       axios(config)
        .then(function (response) {
          res.send(JSON.stringify(response.data));
        })
        .catch(function (error) {
          res.send(error);
        });
  },

  getActivityLogList: async(req, res)=>{
    var fitBitToken =req.fitBitAccessToken;
    var fitBitUser = req.fitBitId;
    var config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${authConfig.FITBIT_BASEURL}user/${fitBitUser}/activities/list.json?afterDate=${req.params.fromDate}&sort=asc&offset=0&limit=30`,
        headers: {
          Authorization: `Bearer ${fitBitToken}`,
        },
      };
      console.log("config",config);
       axios(config)
        .then(function (response) {
          res.send(JSON.stringify(response.data));
        })
        .catch(function (error) {
          res.send(error);
        });


  },
  ///1/activities.json
};
