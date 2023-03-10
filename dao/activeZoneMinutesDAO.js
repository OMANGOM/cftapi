const db = require("../model");

module.exports = {

    addActiveZoneMinutes: (activeZoneMinutesData)=>{
        //console.log(categoryData);
        const activeZoneMinutes = new db.activeZoneMinutes({
            fitBitId: activeZoneMinutesData.fitBitId,
            fatBurnActiveZoneMinutes: activeZoneMinutesData.fatBurnActiveZoneMinutes,
            cardioActiveZoneMinutes: activeZoneMinutesData.cardioActiveZoneMinutes,
            peakActiveZoneMinutes: activeZoneMinutesData.peakActiveZoneMinutes,
            activeZoneMinutes: activeZoneMinutesData.activeZoneMinutes,
            onDateTime: activeZoneMinutesData.onDateTime,
        });
        activeZoneMinutes.save((err, user) => {
            if (err) {
              return({success: false, message: err })
            }
            return({success: true, message: "Updated Successfully" })

        });  
    },
}