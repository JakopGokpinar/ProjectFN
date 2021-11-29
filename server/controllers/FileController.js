const Grid = require('gridfs-stream');
let mongoose = require('mongoose');
const upload = require('../middleware/upload.js');
var path = require('path');
const fs = require('fs');
const AWS = require('aws-sdk');
const config = require('../../aws-config.js');

const ID = config.aws.ID;
const SECRET = config.aws.SECRET;
const BUCKET_NAME = config.aws.BUCKET_NAME;

const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});


getMultipleFiles = (req,res) => {
  var params = {
    Bucket: BUCKET_NAME,
    Delimiter: '/',
    Prefix: 'sss/'
  };

  s3.listObjectsV2(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data.Contents[0].ETag);           // successful response
  });
    
}

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

getImage = async (req,res) => {
    try {
        mongoose.Types.ObjectId(req.query.id)

        var fname = req.query.id;

        const db = mongoose.connection.db;
        let gfs = Grid(db, mongoose.mongo);
        gfs.collection("photos"); 

        const readStream = gfs.createReadStream({_id: fname});

        return await readStream.pipe(res);
    } catch (error) {
        return res.send(error)
    }
}

module.exports = {file,getImage,uploadImage,getFile, getMultipleFiles, downloadFile}