const mongoose = require("mongoose");
const ObjectId = require('mongoose').Types.ObjectId;

const AnnonceSchema = mongoose.Schema({
  _id: {
    type: ObjectId
  },
  title: {
    type: String
  },
  price: {
    type: Number
  },
  annonceImages: {
    type: Array
  },
  date: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: String
  },
  subCategory: {
    type: String
  },
  isFavorite : {
    type: Boolean
  }
});

const myDB = mongoose.connection.useDb('announcements');
const AnnonceModel = myDB.model("Annonce", AnnonceSchema);

module.exports = AnnonceModel;
