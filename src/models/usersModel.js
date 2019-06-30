const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let userSchema = new Schema({

    userName: String,
    userEmail: String,
    userPassword: String,

});

userSchema.statics.updatePassword = function updatePassword(username, somepassword) {

    this.findOneAndUpdate({
            userName: username // condition
        }, {
            $set: {
                userPassword: somepassword //value to update
            }
        },
        function (err) { // call back function
            if (err) {
                throw err;
            }
        })
}

userSchema.statics.getById = function getById(userId) {
    return this.findOne({
            _id: userId //conditions
        }, {}, {
            projection: {
                userPassword: 0 // don't show your password
            }
        },
        function (err) { // callback 
            if (err) {
                return Boom.internal('Error in Database');
            }
        });
}

const User = mongoose.model('User', userSchema);

module.exports = User