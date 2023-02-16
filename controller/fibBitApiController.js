const mongoose = require("mongoose");
const db = require("../model");
const fitBitApiDb = db.fitBitApi;
const axios = require('axios');
var http = require('http');
var path = require('path');

var FitbitStrategy = require( 'passport-fitbit-oauth2' ).FitbitOAuth2Strategy;

module.exports = {
  getFitBitApi: (req, res) => {
    fitBitApiDb
      .find({ appName: "Omangon fit bit app" })
      .then((data) => {
        res.send({
          success: true,
          message: "Fit Data fetched",
          data: data,
        });
      })
      .catch((err) => {
        res.status(500).send({
          success: false,
          message: "Failed to fetch the fitbit list.",
        });
      });
  },

  postFitBit: (req, res) => {
    const {
      appName,
      clientId,
      clientSecret,
      redirectURI,
      authorizationURL,
      tokenRequestURL,
      defaultScope,
      heartRateUpdateSec,
      reqTokenExpiresSec,
      reqAuthCodeExpiresSec,
      lastUpdateTs,
    } = req.body;
    if (!appName || !clientId || !clientSecret) {
      res.status(400).send({
        success: false,
        message: " appName,clientId, clientSecret, is required.",
      });
      return;
    }

    const fitBitApi = new fitBitApiDb({
      appName,
      clientId,
      clientSecret,
      redirectURI,
      authorizationURL,
      tokenRequestURL,
      defaultScope,
      heartRateUpdateSec,
      reqTokenExpiresSec,
      reqAuthCodeExpiresSec,
      lastUpdateTs,
    });

    fitBitApi
      .save(fitBitApi)
      .then((data) => {
        res.send({
          success: true,
          message: "fitBitApi added successfully",
          data: data,
        });
      })
      .catch((err) => {
        res.status(500).send({
          success: false,
          message: "fitBitApi not added.",
          errMessage: err.message,
        });
      });
  },

  fibitcallback: (req, res) => {

    console.log("BBBBBBBBBBBBBBB", req.query);
    const code = req.query.code;

    console.log(code, "=------");

    // axios
    //   .get("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY")
    //   .then((response) => {
    //     console.log(response.data.url);
    //     console.log(response.data.explanation);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  },
};