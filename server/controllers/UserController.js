const passport = require('passport');
const UserModel = require('../models/UserModel.js');
const AnnonceModel = require('../models/AnnonceModel');
const CarSchema = require('../models/AnnonceModels/CarModel.js');
let mongoose = require('mongoose');

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

logout = async (req, res) => {
    var user;
    if (req.user) {
        user = req.user;
    } 
    req.logOut();
    return res.json({ message: 'user logged out', user: user && user});
    
}

getMyAnnonces = (req,res,next) => {
    if(!isLoggedIn(req,res)) return res.json({ message: 'Login to see your data'});
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
    
    var annonce = req.body;
    var newAnnonce = new AnnonceModel(annonce);

    db.collection("users").updateOne(
        { _id: userId },
        { $push: { annonces: newAnnonce} }
    )
    .then(res.json({message: "new annonce created"}))
}

isLoggedIn = (req) => {
    if(!req.user) {
        return false;
    } else {
        return true;
    }
}

module.exports = {login, register, checklogin, logout, getMyAnnonces, createAnnonce};