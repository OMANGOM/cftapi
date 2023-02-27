const router = require('express').Router();
const authRoutes = require('./auth');
const fitBitRoutes = require('./fitBIt');
 

router.use('/auth', authRoutes);
router.use('/fitbit', fitBitRoutes);
 
 
module.exports= router;