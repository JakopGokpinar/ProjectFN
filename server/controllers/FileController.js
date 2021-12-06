const Grid = require('gridfs-stream');
const mongoose = require('mongoose');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const config = require('../../aws-config.js');
const UserModel = require('../models/UserModel.js');

const BUCKET_NAME = config.awsS3User.BUCKET_NAME;
const ACCESS_KEY = config.awsS3User.ACCESS_KEY;
const SECRET_KEY = config.awsS3User.SECRET_ACCESS_KEY;
const REGION = config.awsS3User.BUCKET_REGION;

const s3 = new AWS.S3({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_KEY,
  region: REGION
});


const uploadMulter = (bucketName) =>
  multer({
    storage: multerS3({
      s3,
      bucket: bucketName,
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, `image-${Date.now()}.jpeg`);
      },
    }),
  });

uploadImage = async (req,res) => {
  let location = req.query.location;
  const uploadSingle = uploadMulter(`fn-upload-image/${location}`).single("myImage");
  
  uploadSingle(req, res, async (err) => {
    if (err)
      return res.status(400).json({ success: false, message: err.message });

    console.log("uploaded image: ", req.file)

    res.status(200).json({data: req.file.location})
  });
};

getAnnonceImages = (req,res) => {
  var images = [];
  let user = "ahmet/";
  let annonceId = req.query.id
  var key = user + "annonces/" + annonceId;

  var params = {
    Bucket: BUCKET_NAME,
    Prefix: key
  };

  s3.listObjectsV2(params, function(err, data){
    console.log(data.Contents);
    images = data.Contents.slice(1);
    return res.json({message: "items found", images})
  });
}

getImage = (req,res) => {
  let id = req.query.id;
  var params = {
    Bucket: BUCKET_NAME,
    Key: id
  };

  s3.getObject(params, function(err, data) {
    res.writeHead(200, {'Content-Type': 'image/jpeg'});
    res.write(data.Body, 'binary');
    res.end(null, 'binary');
  });
};

downloadFile = (req,res) => {}

module.exports = {uploadImage,getImage,downloadFile,getAnnonceImages}
