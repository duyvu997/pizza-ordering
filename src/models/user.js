const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

let userSchema =  new Schema({
    userName: String,
    userPassword: String,
    userEmail: String,

});

const User =  mongoose.model('User', userSchema);

module.exports = {
    User
};