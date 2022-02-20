const mongoose = require("mongoose");
const CarSchema = require("./AnnonceModels/CarModel.js");
var subCategory = '';

const AnnonceSchema = mongoose.Schema({
  title: {
    type: String,
    // required: true,
    default: '',
  },
  price: {
    type: Number,
   // required: true,
    default: -1,
  },
  category: {
    type: String,
    //required: true,
    default: "",
  },
  subCategory: {
    type: String,
    //required: true,
    default: "",
  },
  status: {
    type: String,
    default: "used"
  },
  uniqueProps: {
    type: Object,
   // required: true,
    default: {},
  },
  date: {
    type: Date,
    default: Date.now,
  },
  images: {
    type: Array,
  },
  seller: {
    type: Object,
    //required: true,
    default: {},
  },
});

/* const myDB = mongoose.connection.useDb('Cars');
const AnnonceModel = myDB.model("Annonce", AnnonceSchema); */
const AnnonceModel = mongoose.model("Annonce", AnnonceSchema);

/* function setSubCategory (subCat) {
  subCategory = subCat;
}

function getSubCategory () {
  return subCategory;
} */
module.exports = {AnnonceModel};
