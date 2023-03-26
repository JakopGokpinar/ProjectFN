const AWS = require('aws-sdk'); //call AWS services using APIs.
const multer = require('multer');   //dosya yükleme işlemi için kullanılır
const multerS3 = require('multer-s3');
const mongoose = require('mongoose');
const express = require('express');
const crypto = require('crypto');   //to create annonce id 
const ObjectId = require('mongoose').Types.ObjectId;

const aws_config_file = require('../aws-config.js');
const AnnonceModel = require('./models/AnnonceModel.js');

const BUCKET_NAME = aws_config_file.awsS3User.BUCKET_NAME;
const ACCESS_KEY = aws_config_file.awsS3User.ACCESS_KEY;
const SECRET_KEY = aws_config_file.awsS3User.SECRET_ACCESS_KEY;
const REGION = aws_config_file.awsS3User.BUCKET_REGION;

// configure s3
const s3 = new AWS.S3({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_KEY,
    region: REGION,
  });

  const checkFileType = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb('file type is wrong', false);
    }
  };

  const uploadImagesToMulter = (bucketName) => multer({
    storage: multerS3({
      s3: s3,
      bucket: bucketName,
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, file.originalname);    //dosyanın s3'ye yüklenirken kullanılacak adı
      },
    }),
    fileFilter: checkFileType
  }).array('annonceImages',4);  //post request atarken kullanılması gerekn key değeri ve aynı anda maks. kaç dosya yüklenebilir

uploadImagesToAws = (req, res, info) => {
  // return res.json({message: 'You have to login to upload files'});
    if (!req.isAuthenticated()) return res.json({message: 'You have to login to upload files'});
    const user = req.user.email;  //bucket'da her kullanıcı için bir klasör var.
    const annonceId = crypto.randomBytes(12).toString('hex')
    const fileLocation = user + '/annonce-' + annonceId

    const uploadImages = uploadImagesToMulter(`${BUCKET_NAME}/${fileLocation}`)

    uploadImages(req, res, err => {
        if (err){
            res.json({message: 'files could not uploaded', error: err})
            return;
        }
        res.json({ files: req.files, message: 'images uploaded', annonceId})
    })
}

saveAnnonceToDatabase = (req, res) => {
  if(!req.isAuthenticated()) return res.send('user not logged in')

    const user = req.user;
    const annonceProps = req.body.annonceproperties;
    const annonceImages = req.body.imagelocations;
    const annonceId = req.body.annonceid;

    let newAnnonce = AnnonceModel(annonceProps)
    newAnnonce._id = new ObjectId(annonceId);
    newAnnonce.annonceImages = annonceImages;

    uploadToUser(user, newAnnonce);
    uploadToAnnonces(newAnnonce, res)
}

// save  annonce to the user's annonces
uploadToUser = (user, newAnnonce, res) => {
  mongoose.connection.useDb('user').collection('users')
  .updateOne({ _id: user._id}, { $push: { annonces: newAnnonce } })
  .then(() => {
      // console.log('annonce saved to the user')
  })
  .catch (error => {
    res.json(error)
  })
}

//  save annonce to the general annonces database
uploadToAnnonces = (newAnnonce, res) => {
  mongoose.connection.useDb('announcements').collection('annonces')
        .insertOne(newAnnonce)
        .then(result => {
          // console.log('annonce saved to the annonce collection')
          res.json({ message: 'annonce created', result})
        })
        .catch (error => {
          res.json(error)
      })
}


const router = express.Router();

router.post('/imageupload', uploadImagesToAws)
router.post('/create',saveAnnonceToDatabase);

module.exports = router;