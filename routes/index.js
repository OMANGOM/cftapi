const express = require('express');
const router = require('express').Router();

const authRoutes = require('./auth');
 const fitBitApi= require('./fitbitapi')

router.use('/auth', authRoutes);
router.use('/fitbit',fitBitApi);
 
module.exports= router;