const AWS = require("aws-sdk")
const multer = require("multer")
const multerS3 = require("multer-s3")
const awsConfig = require("../config/awsconfig")

const s3 = new AWS.S3({
    AWS_ACCESS_KEY_ID : awsConfig.accessKeyID,
    AWS_SECRET_ACCESS_KEY: awsConfig.secretAccessKey
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.match('image/*')) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type, only image is allowed!"), false);
    }
};


const upload = multer({
    fileFilter,
    storage: multerS3({
        s3,
        bucket : awsConfig.awsBucketName,
        metadata: function (req, file, cb) {
            cb(null, { filename: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, `${Date.now().toString()}-${file.originalname}`);
        },
    }),
});

module.exports = upload