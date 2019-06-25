const mongoose = require('mongoose');



let userSchema = new mongoose.Schema({
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

userSchema.statics.getById = function getById(userID) {
    return this.findOne({
            _id: userID //conditions
        },
        function (err) { // callback 
            if (err) {
                return Boom.internal('Error in Database');
            }
        });
}

userSchema.statics.getByEmail = function getByEmail(useremail) {
    console.log(useremail)
    return this.findOne({
            userEmail: useremail //conditions
        },{}, {
            projection: {
                userPassword: 0 // don't show your password
            }
        },
        function (err, doc) { // callback 
            if (err) {
                throw err;
            }
            return doc;
        });
}

const User = mongoose.model('User', userSchema);

module.exports = User