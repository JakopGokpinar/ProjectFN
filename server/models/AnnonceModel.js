const mongoose = require('mongoose');
const CarSchema = require('./AnnonceModels/CarModel.js');

const AnnonceSchema = mongoose.Schema({
    title: String,
    price: Number,
    category: { type: String },
    subCategory: { type: String },
    properties: {},
    location: { type: String },
    images: [
        {
            location: String
        }
    ]
});

const AnnonceModel = mongoose.model('Annonce', AnnonceSchema);

module.exports = AnnonceModel;

    //id: mongoose.Schema.ObjectId,
