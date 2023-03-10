const db = require("../model");

module.exports = {

    addHeartActivities: (HeartActivityData)=>{
        console.log(HeartActivityData);
        const heartActivities = new db.heartActivities({
            fitBitId: HeartActivityData.name,
            onDateTime: HeartActivityData.id,
            restingHeartRate: HeartActivityData.restingHeartRate,
            heartRateZones: HeartActivityData.heartRateZones,
        });
        heartActivities.save((err, user) => {
            if (err) {
              return({success: false, message: err })
            }
            return({success: true, message: "Updated Successfully" })

        });  
    },
}