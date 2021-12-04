const Grid = require('gridfs-stream');
let mongoose = require('mongoose');
const upload = require('../middleware/upload.js');
var path = require('path');
const fs = require('fs');
const AWS = require('aws-sdk');
const config = require('../../aws-config.js');
const multer = require('multer');
const multerS3 = require('multer-s3');
const ID = config.aws.ID;
const SECRET = config.aws.SECRET;
const BUCKET_NAME = config.aws.BUCKET_NAME;

AWS.config.update({
  region: 'eu-west-1',
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: ID
  })
});

var s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  params: { Bucket: BUCKET_NAME }
});

/* const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    accessKeyId: ID,
    secretAccessKey: SECRET
}); */

const uploadMulter = multer({
  storage: multerS3({
    s3,
    bucket: BUCKET_NAME,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname})
    },
    key: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, ext)
    }
  })
})

getFile = (req,res) => {
  
  var params = {
    Bucket: BUCKET_NAME,
    Key: req.body.key
  };

  s3.getObject(params, function(err, data) {
    console.log(data.Body);
    res.writeHead(200, {'Content-Type': 'image/jpeg'});
    res.write(data.Body, 'binary');
    res.end(null, 'binary');
  });

  /*
  different way 
  var fileKey = 'iphonex.png'; 
  var params = {
    Bucket: BUCKET_NAME,
    Key: fileKey
  };
  res.attachment(fileKey);
  var fileStream = s3.getObject(params).createReadStream();
  fileStream.pipe(res); */
}

downloadFile = (req,res) => {
  var fileKey = 'iphonex.png';


  var params = {
    Bucket: BUCKET_NAME,
    Key: fileKey
  };

  let readStream = s3.getObject(params).createReadStream();
  let writeStream = fs.createWriteStream(path.join(__dirname, fileKey));
  readStream.pipe(writeStream);

  writeStream.on('open', (fd) => {
    res.send("starting the download")
  });
  writeStream.on('finish', () => {
    res.send('ended')
  })
}

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

uploadImage = async (req,res) => {
  console.log(req.body)
  return res.send(req.body.file)

    try {
        await upload(req, res);
        //console.log(req.file);
    
        if (req.files == undefined) {
          return res.send({
            message: "You must select a file.",
          });
        }
        return res.send('files uploaded')
        /* const imgUrl = `http://localhost:3080/file?type=img&id=${req.file.id}`;

        return res.send({
          message: "File has been uploaded.",
          url: imgUrl,
          file: req.file,
        }); */

      } catch (error) {
        return res.json({error})
      }
}

addPhoto = (req, res) => {
  
  var file = req.body.file;
  console.log(req.body.file)
  var fileName = file.name;


  // Use S3 ManagedUpload class as it supports multipart uploads
  var upload = new AWS.S3.ManagedUpload({
    params: {
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: file
    }
  });

  var promise = upload.promise();

  promise.then(
    function(data) {
      alert("Successfully uploaded photo.");
    },
    function(err) {
      return alert("There was an error uploading your photo: ", err.message);
    }
  );
}

module.exports = {file,uploadImage,getFile, downloadFile, uploadMulter, addPhoto}