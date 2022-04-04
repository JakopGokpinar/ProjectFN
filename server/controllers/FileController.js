const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const mongoose = require('mongoose');
const config = require('../../aws-config.js');
const {AnnonceModel} = require('../models/AnnonceModel.js');

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

createAnnonce = async (req,res) => {
  if(!isLoggedIn(req)) return res.json({ message: 'Login to see your data'})

  var userId = req.user._id;
  var category = req.body.properties.category;
  var locations = req.body.locations;

  var imageArray = [];
  var newAnnonce = {};

  for(var i = 0; i<locations.length; i++){
    imageArray.push({location: locations[i]});
  }

  newAnnonce = new AnnonceModel(req.body.properties);
  newAnnonce.images = imageArray;
  newAnnonce.seller = req.body.seller;

  if(category === "Biler"){
    mongoose.connection.useDb("cars").collection(newAnnonce.subCategory).insertOne({
      _id: newAnnonce._id,
      title: newAnnonce.title,
      price: newAnnonce.price,
      category: newAnnonce.category,
      location: newAnnonce.location,
      status: newAnnonce.status,
      date: newAnnonce.date,
      description: newAnnonce.description,
      uniqueProps: newAnnonce.uniqueProps
    })
    .catch(err => {
      return res.json({
        message: "Error occured while creating a car annonce.",
        error: err})
    })
  }

  if(category === "Eindom"){
    mongoose.connection.useDb("property").collection('bolig-til-salgs').insertOne({
      newAnnonce
    })
    .catch(err => {
      return res.json({
        message: "Error occured while creating a property annonce.",
        error: err})
    })
  }
    
    mongoose.connection.useDb("user").collection("users").updateOne(
        { _id: userId },
        { $push: { annonces: newAnnonce} }
    )
    .then(res.json({message: "new annonce created", locations: locations}))
    .catch(err => res.json({
      message: "Error occured while pushing annonce to user's annonces.",
      error: err
    }));
}


getMenuItems = (req,res) => {
  
  const productDBs = ["cars","property"];
  

  const findCollections = async (collections) => {
    // console.log("collections", collections);
    return new Promise((resolve, reject) => {
      collections.forEach((collection) => {
        let collectionObj = {
          name: collection.namespace.split(".")[1],
          value: collection,
        };
      resolve(collectionObj);
      });
    });
  };

  async function test(collections) {
    return new Promise((resolve,reject) => {
      for(const col of collections){
        /* col.find({}).toArray()
        .then(item => {
          // console.log("item",item)
          resolve(item)
        }) */
        resolve(col)
      } 
    })
  }

  async function takeCols(col) {
    console.log("col name",col.namespace)
    return new Promise((resolve,reject) => {
      col.find({}).toArray()
        .then(item => {
          // console.log("item",item)
          resolve(item)
        })
    })
  }

  async function pushToItems(itemArr){
    itemArr.push(itemArr);
  }

   async function resolveCollections () {  
    // return new Promise((resolve,reject) => {
     var promises = productDBs.map(async db =>   new Promise((resolve,reject) => {
      mongoose.connection.useDb(db).db.collections()
      .then(async collections => {
        let getCol = await test(collections);
        let getItemArray = await takeCols(getCol)
       resolve(getItemArray)
      })     
    }));

    Promise.all(promises).then(itemArr => {
    console.log("itemArr",itemArr)

      sendServer(itemArr)
  })
  .catch(error => {
    console.log(error)
  })
       
// })
  }

  const collectionItems = collections  => {
    console.log("given collections",collections)
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
    res.json({items: items})
  }
  resolveCollections()
  // console.log("gorev tamamlandi")
  // resolveCollections.then(collectionItems).then(sendServer)
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