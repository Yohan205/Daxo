const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const findOrCreate = require('mongoose-findorcreate');
const passportLocalMongoose = require('passport-local-mongoose');

const Users = new Schema({
    googleId: {type: 'string'},
    user: {type: 'string'},
    photo: {type: 'string'},
    email: {type: 'string'}
});


// HASH & SALT
Users.plugin(passportLocalMongoose);
Users.plugin(findOrCreate);

module.exports = mongoose.model('users', Users);