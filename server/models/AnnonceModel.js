const mongoose = require("mongoose");

const AnnonceSchema = mongoose.Schema({
  title: {
    type: String,
    // required: true,
    default: '',
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
  price: {
    type: Number,
   // required: true,
    default: -1,
  },
  location: {
    type: String,
    default: 'Kristiansand'
  },
  status: {
    type: String,
    default: ""
  },
  images: {
    type: Array,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  description: {type: String, default: ''},
  uniqueProps: {
    type: Object,
   // required: true,
    default: {},
  },
  
  seller: {
    type: Object,
    //required: true,
    default: {
      Name: "Tobias",
      Lastname: "Land",
      Address: "32 Fjordvegen 4560 Kristiansand",
      Point: 3.0,
      Verified: false
    },
  },
});

const AnnonceModel = mongoose.model("Annonce", AnnonceSchema);

module.exports = {AnnonceModel};
