const express = require('express')
const app = express()
const routes = require('./routes');
const cors = require('cors');
const db = require("./model");
const seedUser = require('./dataseed/seedUser');
const seedRole = require('./dataseed/seedrole');
const awsConfig = require("./config/awsconfig")
const AWS = require("aws-sdk")
const port = 3001
app.use(cors());



app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use("/api", routes);
//const dbUrl = 'mongodb://0.0.0.0:27017/cftapp';
const dbUrl = `mongodb+srv://rajan:RgyFeQt0pUKASmVi@cluster0.ayvk4v6.mongodb.net/cftapp`;

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
 
  AWS.config.update({
    accessKeyId: awsConfig.accessKeyID,
    secretAccessKey: awsConfig.secretAccessKey
  })
  

  app.use((error, req, res, next) => {
    console.log('Requested URL ---- ', req?.originalUrl, ' ---------- Time: ', Date.now())
    const message = `this is the unexpected field-> ${error}`;
    console.log("message: ",  message  );
   return res.status(500).send(message);
  })
  

  app.use((req, res, next) => {
    console.log('Requested URL ---- ', req?.originalUrl, ' ---------- Time: ', Date.now())
    next()
  })
  

app.get('/', (req, res) => res.send('Welcome to CFT API'))
app.listen(port, () => console.log(`CFT API listening on port ${port}!`))