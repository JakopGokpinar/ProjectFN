const Grid = require('gridfs-stream');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const mongoose = require('mongoose');
const config = require('../../aws-config.js');
const UserModel = require('../models/UserModel.js');
const AnnonceModel = require('../models/AnnonceModel.js');

const BUCKET_NAME = config.awsS3User.BUCKET_NAME;
const ACCESS_KEY = config.awsS3User.ACCESS_KEY;
const SECRET_KEY = config.awsS3User.SECRET_ACCESS_KEY;
const REGION = config.awsS3User.BUCKET_REGION;

const s3 = new AWS.S3({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_KEY,
  region: REGION
});

isLoggedIn = (req) => {
  if(!req.user){
      return false;
  } else {
      return true;
  }
}

const uploadMulter = (bucketName) => 
  multer({
    storage: multerS3({
      s3: s3,
      bucket: bucketName,
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, `${file.originalname}`);
      }
    }),
 }).array('galleryImage', 4);

uploadImages = (req,res) => {
  let location = req.query.location;
  const uploadMultiple = uploadMulter(`fn-upload-image/${location}`);
  
  uploadMultiple(req, res, async (err) => {
    if (err)
      return res.status(400).json({ success: false, message: err.message });

    console.log("uploaded image: ", req.files)

    res.status(200).json({files: req.files})
  });
}

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

createAnnonce = async (req,res, next) => {
  if(!isLoggedIn(req)) return res.json({ message: 'Login to see your data'})
  console.log(req.body);
  var db = mongoose.connection.db;
  var userId = req.user._id;

  var imgLocations = req.body;
  var newImages = [];

    var newAnnonce = new AnnonceModel();
    newAnnonce.title = "deneme annonce u";
    newAnnonce.price = 100;
      
    for(var i = 0; i<imgLocations.length; i++){
      newImages.push({location: imgLocations[i]});
    }
    newAnnonce.images = newImages;
  
    db.collection("users").updateOne(
        { _id: userId },
        { $push: { annonces: newAnnonce} }
    )
    .then(res.json({message: "new annonce created", locations: imgLocations}))
}

module.exports = {getImage,getAnnonceImages,uploadImages,createAnnonce}