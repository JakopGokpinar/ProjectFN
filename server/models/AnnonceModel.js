const mongoose = require('mongoose');
const CarSchema = require('./AnnonceModels/CarModel.js');

const AnnonceSchema = mongoose.Schema({
    title: {
        type: String
    },
    description: { type: String },
    price: Number,
    photos: { type: String },
    owner: { type: Object },
    date: { type: Date, default: Date.now},
    category: { type: String },
    subCategory: { type: String },
    properties: {},
    seenCount: { type: Number },
    favoritedCount: { type: Number },
    messageCount: { type: Number},
    location: { type: String }
});

const AnnonceModel = mongoose.model('Annonce', AnnonceSchema);

module.exports = AnnonceModel;

    //id: mongoose.Schema.ObjectId,
