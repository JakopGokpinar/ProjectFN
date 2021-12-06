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
})

getImage = (req,res) => {
  let id = req.params.id;
  var params = {
    Bucket: BUCKET_NAME,
    Key: id
  };

  s3.getObject(params, function(err, data) {
    res.writeHead(200, {'Content-Type': 'image/jpeg'});
    res.write(data.Body, 'binary');
    res.end(null, 'binary');
  });
}

getImages = async (req, res) => {
  var allKeys = [];

  var opts = { Bucket: BUCKET_NAME };

  await s3.listObjectsV2(opts, function(err, data){
    console.log(data.Contents);
    allKeys = data.Contents;
    return res.json({message: "items found", images: allKeys})
  });
}

downloadFile = (req,res) => {}

file = async (req, res) => {
    let type = req.query.type;
    let gfs;

    switch (type) {
        case "img":
            mongoose.Types.ObjectId(req.query.id)

            let id = req.query.id
            const db = mongoose.connection.db;            

            gfs = Grid(db, mongoose.mongo);
            gfs.collection("photos")                     
            
            const readStream = gfs.createReadStream({_id: id});

           return readStream.pipe(res);
        default:
            return res.send("Invalid file parameters!");
    }
}

const uploadM = (bucketName) =>
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
  const uploadSingle = uploadM("fn-upload-image").single("myImage");
  
  uploadSingle(req, res, async (err) => {
    if (err)
      return res.status(400).json({ success: false, message: err.message });

    console.log(req.file)

    await UserModel.create({ email: req.file.location });

    res.status(200).json({data: req.file.location})
  });
}

module.exports = {file,uploadImage,getImage,downloadFile,getImages}
