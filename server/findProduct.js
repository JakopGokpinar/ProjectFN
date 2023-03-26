const mongoose = require('mongoose');
const express = require('express');
const ObjectId = mongoose.Types.ObjectId;

findProduct = (req, res) => {

    let productId = req.query.id;

    mongoose.connection.useDb('announcements').collection('annonces').findOne({ _id: ObjectId(productId)}).then(result => {
        res.json({ product: result, message: 'Product is found' })
    })
    .catch (error => {
        res.json({ error, message: 'An error occured while finding the product' })
    })
}


const router = express.Router();

router.get('/', findProduct)

module.exports = router;