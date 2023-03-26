const express = require('express');
const ObjectId = require('mongoose').Types.ObjectId;
const UserModel = require('./models/UserModel.js');

userAnnonces = (req, res) => {
    if (!req.isAuthenticated()) return res.json({ message: 'Please login to access this data'});

    const userId = req.user.id;
    UserModel.findOne({ _id: ObjectId(userId) }).then(response => {

        const userAnnonces = response.annonces;
        return res.json({ productArray: userAnnonces, message: 'Products found' });
    })
    .catch(error => {
        return res.json(error)
    })
}

const router = express.Router();

router.get('/', userAnnonces);

module.exports = router;