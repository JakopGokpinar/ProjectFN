const mongoose = require('mongoose');

const CarSchema = mongoose.Schema({
    carPlate: String,
    modelYear: Number
});



module.exports = CarSchema;