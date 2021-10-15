const express = require("express");
const router = express.Router();
const passport = require('passport');
const UserModel = require('../models/UserModel.js');

router.post("/register_login", (req, res, next) => {
    passport.authenticate("local", function(err, user, info) {
        if (err) return res.json({ error: err });
        if (!user) return res.json({ message: "No user"});

        req.logIn(user, function(err) {
            if (err) return res.json({ error: err });

            return res.status(200).json({ success: `Logged in ${user.id}` });
        });
    })(req, res, next);
})

router.post("/login", (req, res, next) => {
    passport.authenticate("local", function(err, user, info) {
        if(err) console.log(error);
        if (!user) return res.json({ message: 'No user found with that email or password'});

        req.logIn(user, function(err){
            if(err) return next(err);
            return res.json({ user: user, message: 'user logged in'})
        })
    })(req, res, next);
})

router.get('/checklogin', (req, res, next) => {
    if (req.user){
        return res.json({ message: 'user logged in', user: req.user});
    } else {
        return res.json({ message: 'user not logged in', user: req.user});
    }
})

router.get('/logout', (req, res, next) => {
    req.logOut();
    return res.json({ message: 'user logged out'});

})

module.exports = router;