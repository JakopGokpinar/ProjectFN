const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const mongoose = require('mongoose');
const config = require('../../aws-config.js');
const UserModel = require('../models/UserModel.js');
const {AnnonceModel} = require('../models/AnnonceModel.js');
const { collection } = require('../models/UserModel.js');

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

  var userDb = mongoose.connection.useDb("user");
 
  var annoncesDb = mongoose.connection.useDb("announcements");
  var carAnnoncesDb = mongoose.connection.useDb("cars");

  var userId = req.user._id;
  var category = req.body.properties.category;
  var subCategory = req.body.properties.subCategory;
  console.log("cate", category)
  console.log("sub cate", subCategory)
  var imgLocations = req.body.locations;
  var newImages = [];
  var newAnnonce = {};

  for(var i = 0; i<imgLocations.length; i++){
    newImages.push({location: imgLocations[i]});
  }
  newAnnonce.images = newImages;
  newAnnonce.seller = req.body.seller

  if(category === "Biler"){
    var carAnnoncesDb = mongoose.connection.useDb("cars");
    newAnnonce = new AnnonceModel(req.body.properties);
    if(subCategory === "Biler") {
      carAnnoncesDb.collection('biler').insertOne({
        newAnnonce
      })
    } else if(subCategory.toUpperCase() === "BOBILER"){
      carAnnoncesDb.collection('bobiler').insert({
        newAnnonce
      })
    }
  }

  if(category === "Eindom"){
    var propertyAnnoncesDb = mongoose.connection.useDb("property");
    newAnnonce = new AnnonceModel(req.body.properties);
    if(subCategory === "Bolig til salgs") {
      propertyAnnoncesDb.collection('bolig-til-salgs').insertOne({
        newAnnonce
      })
    } else if(subCategory.toUpperCase() === "BOLIG TIL LEIE"){
      propertyAnnoncesDb.collection('bolig til leie').insert({
        newAnnonce
      })
    }
  }
    
    userDb.collection("users").updateOne(
        { _id: userId },
        { $push: { annonces: newAnnonce} }
    )
    .then(res.json({message: "new annonce created", locations: imgLocations}))
    .catch(err => res.json({error: err}));
}

getMenuItems = (req,res) => {
  
  var annoncesDb = mongoose.connection.useDb("announcements");
  const productDBs = ["cars","property"]
  var client = mongoose.connection.getClient();
  
  const getDatabases = new Promise((resolve,reject) => {
    var databaseArr = []
    client.db().admin().listDatabases()
    .then(databases => {
      databases.databases.map(db => {
        if(productDBs.includes(db.name) === false) return;
        databaseArr.push(db.name)
      }) 
    })
    .then(() => {
      resolve(databaseArr)
    })
  })

  const findCollections = async (databaseArr) => {
        const promise = databaseArr.map(async db => {
          return new Promise((resolve,reject) => {
          mongoose.connection.useDb(db).db.collections()
          .then(collections => {
            collections.find(col => {
              let collection = {
                name: col.namespace.split('.')[1],
                value: col
              }
              resolve(collection)
            })  
          })
        } ) 
      })
      return await Promise.all(promise)
  }

  const collectionItems = collections  => {
    console.log(collections)
    const promise = collections.map(async collection => {
      return new Promise((resolve,reject) => {
          collection.value.find({}).toArray()
          .then(items => {
            let item = {
              collectionName: collection.name,
              value: items
            }
            resolve(item)
          })
      })
    })
    return Promise.all(promise)
  }

  const sendServer = items => {
    console.log(items)
    res.json({items: items})
  }

  getDatabases.then(findCollections).then(collectionItems).then(sendServer)
}


module.exports = {getImage,getAnnonceImages,uploadImages,createAnnonce, getMenuItems};

/* client.db().admin().listDatabases()
  .then(dbs => {
    console.log("step1")
    dbs.databases.map(item => { 
      if(productDBs.includes(item.name) === false) return;
      databases.push(item.name);
    })
    console.log("Mongo databases", databases);
  })

  var datab = databases[1];
  var colArr = [];
  var colItemArr = []

  mongoose.connection.useDb(datab).db.collections()
    .then(collection => {
      console.log("step2")
      collection.find(col => {
        colArr.push(col)
      })
    })
    .then(() => {
      console.log("step 3")
      colArr.map(colItem => {

        colItem.find({}).toArray()
        .then(item => {
          items.push(item)
          console.log(item)

        })
        
      })
      return res.json({items})
    }) */