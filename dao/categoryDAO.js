const db = require("../model");

module.exports = {

    addCategory: (categoryData)=>{
        //console.log(categoryData);
        const category = new db.category({
            name: categoryData.name,
            id: categoryData.id,
            parentId: categoryData.parentId,
        });
        category.save((err, user) => {
            if (err) {
              return({success: false, message: err })
            }
            return({success: true, message: "Updated Successfully" })

        });  
    },
    addActivity:(activityData)=>{
         const activity = new db.activity({
            name: activityData.name,
            id: activityData.id,
            accessLevel: activityData.accessLevel,
            hasSpeed: activityData.hasSpeed,
            mets : activityData.mets,
            parentId: activityData.categoryId
        });
       return activity.save((err, activity) => {
            if (err) {
                console.log(err);
              return({success: false, message: err })
            }
            return({success: true, message: "Updated Successfully" })

        });
    },

    addActivityLevel:(activityLevelData) =>{
        const activityLevel = new db.activityLevel({
            id : activityLevelData.id,
            maxSpeedMPH : activityLevelData.maxSpeedMPH,
            mets : activityLevelData.mets,
            minSpeedMPH : activityLevelData.minSpeedMPH,
            name: activityLevelData.name,
            parentId : activityLevelData.parentId,
        })
        return activityLevel.save(activityLevel);

    },

}