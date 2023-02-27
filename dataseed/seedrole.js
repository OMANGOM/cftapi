const db = require("../model");
const Role = db.role;

module.exports={
    initializeRole: async ()=>{
   
    return await db.role.find({role:"admin"}).then((role, err) =>{
      if(!err && role.length===0){
          new Role({
            role: "admin"
        })
        .save((err, Role)=>{
            if(err) console.log("error in add role: ", err);
            return Role;
          });
        }
        if(!err && role.length != 0){
            return role;
        }
      })
    }
}