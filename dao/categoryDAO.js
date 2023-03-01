const db = require("../model");

module.exports = {

    addCategory: (categoryData, parentId)=>{
        const category = new db.category({
            name: categoryData.name,
            id: categoryData.id,
            hasSpeed: categoryData.hasSpeed,
            activityLevel: categoryData.activityLevel,
            parentId: parentId
        });
        category.save((err, user) => {
            if (err) {
             // res.status(500).send({ message: err });
              return({success: false, message: err })
            }
            return({success: true, message: "Updated Successfully" })

        });
    }

}