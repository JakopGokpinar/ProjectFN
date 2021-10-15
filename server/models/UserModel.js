const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    annonces: [
        {title: {type: String}}, 
        {count: {type: Number}}
    ]
},
{ strict: false}

);

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;