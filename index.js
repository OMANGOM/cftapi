const express = require("express");
const app = express();
const routes = require("./routes");
const cors = require("cors");
const db = require("./model");
const seedUser = require("./dataseed/seedUser");
const seedRole = require("./dataseed/seedrole");
const authDAO = require("./dao/authdao");
const authConfig = require("./config/authConfig");

const passport = require("passport");
const session = require("express-session");
const { config } = require("dotenv");
const FitbitStrategy = require("./fitBitLib").FitbitOAuth2Strategy;
const cookieParser = require("cookie-parser");
const port = 3000;

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);
const dbUrl = "mongodb://0.0.0.0:27017/cftapp";
//const dbUrl = `mongodb+srv://rajan:RgyFeQt0pUKASmVi@cluster0.ayvk4v6.mongodb.net/cftapp`;
db.mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    bufferCommands: false,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Connection to db established.");
    await seedRole.initializeRole().then((role, err) => {
      if (err) {
        console.log("Error in role Creation: ", err);
        process.exit();
      }
      var user = seedUser.seedUser();
    });
  })
  .catch((err) => {
    console.log("Error in db connection: ", err);
    process.exit();
  });

app.use((error, req, res, next) => {
  console.log(
    "Requested URL ---- ",
    req?.originalUrl,
    " ---------- Time: ",
    Date.now()
  );
  const message = `this is the unexpected field-> ${error}`;
  console.log("message: ", message);
  return res.status(500).send(message);
});

app.use((req, res, next) => {
  console.log(
    "Requested URL ---- ",
    req?.originalUrl,
    " ---------- Time: ",
    Date.now()
  );
  console.log(req.query.code);
  next();
});

//app.get('/', (req, res) => res.send('Welcome to CFT API'))

app.use(passport.initialize());
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: authConfig.secret,
  })
);
app.use(
  passport.session({
    resave: false,
    saveUninitialized: true,
  })
);

const CLIENT_ID = "2395T3";
const CLIENT_SECRET = "9c19b8490e7de175ec25620404ac747e";
app.use(passport.initialize());
var fitbitStrategy = new FitbitStrategy(
  {
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    scope: ["activity", "heartrate", "location", "profile"],
    callbackURL: "http://localhost:3000/api/auth/fitbit/callback",
  },
  function (accessToken, refreshToken, profile, expires_in, done) {
    console.log(
      accessToken,
      "-----------",
      expires_in,
      "--------------------",
      refreshToken
    );
    authDAO.updateAccessToken(accessToken, refreshToken, profile);
    return done(null, {
      accessToken: accessToken,
      refreshToken: refreshToken,
      profile: profile,
    });
  }
);

passport.use(fitbitStrategy);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

var fitbitAuthenticate = passport.authenticate("fitbit", {
  successRedirect: "/auth/fitbit/success",
  failureRedirect: "/auth/fitbit/failure",
});
//http://localhost:3000/auth/fitbit/callback?code=cfdd5446d4aa0c14a4614189accaa4f8f8e1b0cc#_=_
app.get("/api/auth/fitbit/callback", fitbitAuthenticate);
app.get("/auth/fitbit/success", function (req, res, next) {
  res.send(req.user);
});

app.listen(port, () => console.log(`CFT API listening on port ${port}!`));