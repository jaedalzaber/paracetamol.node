const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
    roles: [{
        type: String,
        required: false
    }],
    attributes: [{
        type: Object,
        required: false
    }],

    facebookId: String,
    googleId: String,
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);