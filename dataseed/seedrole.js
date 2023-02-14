const db = require("../model");
const Role = db.role;

module.exports={
    initializeRole: async ()=>{
   
    db.role.estimatedDocumentCount(async (err, count) =>{
      if(!err && count === 0){
          new Role({
            role: "admin"
        })
        .save((err, Role)=>{
            if(err) console.log("error in add role: ", err);
            return Role;
          });
        }
        if(!err && count != 0){
            console.log(count);
        }
      })
    }
}