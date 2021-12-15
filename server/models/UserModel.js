const mongoose = require('mongoose');
// const AnnonceSchema = require('./AnnonceModel.js');

const UserSchema = mongoose.Schema({
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    annonces: []
},
{ strict: false}

);

const myDB = mongoose.connection.useDb('user');
const UserModel = myDB.model("User", UserSchema);   
// const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;