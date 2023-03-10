const db = require("../model");
module.exports = {
  updateUser: (userId, userData) => {
    console.log("profile", userData);
    try {
      return db.user
        .findOneAndUpdate(
          {
            _id: userId,
          },
          {
            ...userData,
          }
        )
        .then((data, err) => {
          if (err) {
            return {
              success: false,
              message: "Failed to update access Token.",
            };
          }
          if (!data) {
            return {
              success: false,
              message: "User Not Found.",
            };
          }
          if (data) {
            return {
              success: true,
              message: "User updated successfully.",
              data: data,
            };
          }
        })
        .catch((err) => {
          return {
            success: false,
            message: "Failed to update Token.",
            err,
          };
        });
    } catch (err) {
      return {
        success: false,
        message: "Failed to update Token.",
        err,
      };
    }
  },
  getUserData: (userID) => {
    return db.user
      .findOne({ _id: userID })
      .then((data, err) => {
        return {
          success: true,
          message: "User fetched successfully.",
          data: data,
        };
      })
      .catch((err) => {
        return {
          success: false,
          message: "Failed to update Token.",
          err,
        };
      });
  },

  getUserDataByFitBitId: (userID) => {
    return db.user
      .findOne({ fitBitId: userID })
      .then((data, err) => {
        console.log("EEEEEEEEEEEEEEEEEE",data)
        return {
          success: true,
          message: "User fetched successfully.",
          data: data,
        };
      })
      .catch((err) => {
        return {
          success: false,
          message: "Failed to get user details.",
          err,
        };
      });
  },

};