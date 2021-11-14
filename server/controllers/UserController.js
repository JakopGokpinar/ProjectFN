const passport = require('passport');
const UserModel = require('../models/UserModel.js');
const AnnonceModel = require('../models/AnnonceModel');
const CarSchema = require('../models/AnnonceModels/CarModel.js');
let mongoose = require('mongoose');
var fs = require('fs');
const multer = require('multer');
const upload = require('../middleware/upload.js')
const GridFSBucket = require("mongodb").GridFSBucket;
const GridFS = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const url = require('url')

login = async (req, res, next) => {
    passport.authenticate("local", function(err, user, info) {
        if(err) console.log(error);
        if (!user) return res.json({ message: 'No user found with that email or password'});

        req.logIn(user, function(err){
            if(err) return next(err);
            return res.json({ user: user, message: 'user logged in'})
        })
    })(req, res, next);
}

register = (req, res, next) => {
    passport.authenticate("local", function(err, user, info) {
        if(err) console.log(error);
        if (!user){
            let newuser = req.body;
            console.log(newuser);

            var user = new UserModel(newuser);
            user.save()
                .then(result => {
                    res.json({ message: 'User created', user: user});
                })
                .catch(error => {
                    res.json({ message: 'Registration failed', err: error})
                })
        }
        else {
            return res.json({ message: 'This email is registred with different account', user: user});
        }
    })(req, res, next);
}

checklogin = (req,res,next) => {
    if (req.user){
        return res.json({ message: 'user logged in', user: req.user});
    } else {
        return res.json({ message: 'user not logged in', user: req.user});
    }
}

isLoggedIn = (req) => {
    if(!req.user){
        return false;
    } else {
        return true;
    }
}

logout = async (req, res) => {
    var user;
    if (req.user) {
        user = req.user;
    } 
    req.logOut();
    return res.json({ message: 'user logged out', user: user && user});
}

getMyAnnonces = (req,res,next) => {
    if(!isLoggedIn(req)) return res.json({ message: 'Login to see your data'});
    var user = req.user;
    UserModel.findOne({ email: user.email })
        .then(user => {
            return res.json({ message: 'user\'s annonces', annonces: user.annonces});
        })
        .catch(error => {
            return res.json({ message: 'An error occured', error})
        })
}

createAnnonce = (req,res, next) => {
    if(!isLoggedIn(req)) return res.json({ message: 'Login to see your data'})
    var db = mongoose.connection.db;
    var userId = req.user._id;
    
    console.log(request.file);


    var newAnnonce = new AnnonceModel(req.body);


    db.collection("users").updateOne(
        { _id: userId },
        { $push: { annonces: newAnnonce} }
    )
    .then(res.json({message: "new annonce created"}))
}

uploadImage = async (req, res) => {
    try {
      await upload(req, res);
      console.log(req.file);
  
      if (req.file == undefined) {
        return res.send({
          message: "You must select a file.",
        });
      }
  
      const imgUrl = `http://localhost:3080/user/file?filename=${req.file.filename}`
      return res.send({
        message: "File has been uploaded.",
        url: imgUrl,
        file: req.file,
      });
    } catch (error) {
      console.log(error);
  
      return res.send({
        message: "Error when trying upload image: ${error}",
      });
    }
  };

  getImages = async (req, res) => {
    try {  
        //const queryObject = url.parse(req.url,true).query;

        const db = mongoose.connection.db;
        let gfs = Grid(db, mongoose.mongo);

        gfs.collection("photos"); 
        gfs.files.find().toArray((err, files) => {
            var filesArr = files.slice(-2)
            console.log(filesArr)
            return res.json({files:filesArr})
        })
        /* const readStream = gfs.createReadStream(fname);
        return readStream.pipe(res);*/

    } catch (error) {
      return res.status(500).send({
        message: error.message
      });
    }
  };

getImage = async (req,res) => {
    try {
        var fname = req.query.filename;

        const db = mongoose.connection.db;
        let gfs = Grid(db, mongoose.mongo);

        gfs.collection("photos"); 
        const readStream = gfs.createReadStream(fname);
        return readStream.pipe(res);
    } catch (error) {
        return res.send(error)
    }
}

getUsers = (req,res) => {
    const userId = req.user._id;
    const annonceId = req.body.annonceId
   
    UserModel.findOne({_id: userId})
        .then(user => {
            var annoncesArr = user.annonces;
            var annonce = annoncesArr.filter((element) =>  {
                return element._id == annonceId;
            })[0];
            return res.json({message: 'annonce found', annonce});
        })
        .catch(err => {
            return res.send(err);
        })
}

module.exports = {login, register, checklogin, logout, getMyAnnonces, createAnnonce, getUsers, uploadImage,getImage, getImages};