const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
require('dotenv').config();

const s3 = new aws.S3({
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
        accessKeyId: process.env.ACCESS_KEY_ID,
        region: 'ap-south-1'
    })
  
const fileFilter = (req, file, callback) => {
        if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
            callback(null, true)
        } else {
            callback(new Error('Invalid Mime Type,only JPEG and PNG'), false);
        }
    }
    
const upload = multer({
    fileFilter,
    storage: multerS3({
        s3: s3,
        bucket: 'fundooappimg', 
        metadata: function(req, file, callback) { 
            callback(null, { fieldName: file.fieldname });
        },
        key: function(req, file, callback) { 
            console.log("in here");
            callback(null, Date.now().toString())
        }
    })
})
module.exports = upload;