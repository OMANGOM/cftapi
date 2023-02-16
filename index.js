const express = require('express')
const app = express()
const routes = require('./routes');
const cors = require('cors');
const db = require("./model");
const seedUser = require('./dataseed/seedUser');
const seedRole = require('./dataseed/seedrole');
 
const authConfig = require("./config/authConfig");

 
const port = 3000
app.use(cors());

 

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

 
app.use("/api", routes);
const dbUrl = 'mongodb://0.0.0.0:27017/cftapp';
//const dbUrl = `mongodb+srv://rajan:RgyFeQt0pUKASmVi@cluster0.ayvk4v6.mongodb.net/cftapp`;

db.mongoose
  .connect(dbUrl, 
    { 
      useNewUrlParser: true, 
      bufferCommands: false,
      useUnifiedTopology: true
    })
  .then(async () => {
    console.log("Connection to db established.");
     await seedRole.initializeRole().then((err, role)=>{
      if (err) {
        console.log("Error in role Creation: ", err);
        process.exit();
      }
      else{
       console.log("Role", role);
       var user =  seedUser.seedUser();
       console.log(user);
      }
     
     }); 
   
  })
  .catch((err) => {
    console.log("Error in db connection: ", err);
    process.exit();
  });
 
 
  

  app.use((error, req, res, next) => {
    console.log('Requested URL ---- ', req?.originalUrl, ' ---------- Time: ', Date.now())
    const message = `this is the unexpected field-> ${error}`;
    console.log("message: ",  message  );
   return res.status(500).send(message);
  })
  

  app.use((req, res, next) => {
    console.log('Requested URL ---- ', req?.originalUrl, ' ---------- Time: ', Date.now())
    console.log(req.query.code);
    next()
  })
  


//app.get('/', (req, res) => res.send('Welcome to CFT API'))

 //
 var passport = require('passport');
 var session = require('express-session');
const { config } = require('dotenv');
var FitbitStrategy = require('./lib').FitbitOAuth2Strategy;
 app.use(session({resave: true,
  saveUninitialized: true,
  secret: authConfig.secret }));

app.use(passport.initialize());
app.use(passport.session({ }));

 
const CLIENT_ID = '2395T3';
const CLIENT_SECRET = '9c19b8490e7de175ec25620404ac747e';

var FitbitStrategy = require( 'passport-fitbit-oauth2' ).FitbitOAuth2Strategy;
app.use(passport.initialize());
passport.use(new FitbitStrategy({
    clientID:     CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/fitbit/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    //console.log(profile,">>>>",done);
    console.log(accessToken,"-------------------------------" ,refreshToken);
    //console.log(expires_in,">>>>",scope);
    db.user.find({ fitBitId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
app.get('/auth11/fitbit',
passport.authenticate('fitbit', { scope: ['activity','heartrate','location','profile'] }
));
//http://localhost:3000/auth/fitbit/callback?code=cfdd5446d4aa0c14a4614189accaa4f8f8e1b0cc#_=_
app.get('/auth/fitbit/callback', passport.authenticate( 'fitbit', { 
      successRedirect: '/auth/fitbit/success',
      failureRedirect: '/auth/fitbit/failure'
}));
app.get('/auth/fitbit/success', function(req, res, next) {
  res.send({
    token:req.accessToken,
    refreshToken: req.refreshToken,
    user: req.user
  });
});

 //
 
 
app.listen(port, () => console.log(`CFT API listening on port ${port}!`))