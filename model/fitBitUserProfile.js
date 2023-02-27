const mongoose = require("mongoose");
const fitBitUserProfile = mongoose.model(
  "fitBitUserProfile",
 new mongoose.Schema({
  userId: {
    type:  mongoose.Schema.Types.ObjectId,
    ref: 'User'
     },
  fitBitId: String,
  displayName: String,
  age: Number,
  avatar: String,
  avatar150: String,
  avatar640: String,
  averageDailySteps: Number,
  challengesBeta: Boolean,
  clockTimeDisplayFormat: String,
  corporate: Boolean,
  corporateAdmin: Boolean,
  dateOfBirth: Date,
  displayName: String,
  displayNameSetting: String,
  distanceUnit: String,
  encodedId: String,
  firstName: String,
  foodsLocale: String,
  fullName: String,
  gender: String,
  glucoseUnit: String,
  height: Number,
  heightUnit: Number,
  isBugReportEnabled: Boolean,
  isChild: Boolean,
  isCoach: Boolean,
  languageLocale: String,
  lastName: String,
  legalTermsAcceptRequired: Boolean,
  locale: String,
  memberSince: Date,
  mfaEnabled: Boolean,
  offsetFromUTCMillis: Number,
  sdkDeveloper: Boolean,
  sleepTracking: String,
  startDayOfWeek: String,
  strideLengthRunning: Number,
  strideLengthRunningType: String,
  strideLengthWalking: Number,
  strideLengthWalkingType: String,
  swimUnit: String,
  timezone: String,

  visibleUser: Boolean,
  waterUnit: String,
  waterUnitName: String,
  weight: Number,
  weightUnit: String,
  isActive: {
    type: Boolean,
    default: true,
  },
},
{ timestamps: true }
));

// Exports the model

module.exports = fitBitUserProfile;  