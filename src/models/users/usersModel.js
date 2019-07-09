const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Address =  require('../address/addressModel');


let userSchema = new Schema({

    userName: String,
    userEmail: String,
    userPassword: String,
    userAddress: String,
    userPhone: String,
    userPoint: Number

});



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

userSchema.statics.updatePassword = function updatePassword(username, somepassword) {

    this.findOneAndUpdate({
            userName: username // condition
        }, {
            $set: {
                userPassword: somepassword 
            }
        },
        function (err) { 
            if (err) {
                throw err;
            }
        })
}

userSchema.statics.updateDefaultAddress =  function updateDefaultAddress(userID, address) {
    
    console.log("update Address");
    this.findOneAndUpdate({
        _id: userID // condition
    }, {
        $set: {
            userAddress: address 
        }
    },
    function (err) { // call back function
        if (err) {
            throw err;
        }
    })
}
userSchema.statics.updateDefaultPhone = function updateDefaultPhone(userID, phoneNumber) {
    console.log("update Phone");
    console.log(userID);
    this.findOneAndUpdate({
        _id: userID // condition
    }, {
        $set: {
            userPhone: phoneNumber 
        }
    },
    function (err) { // call back function
        if (err) {
            throw err;
        }
    })
}

const User = mongoose.model('User', userSchema);

module.exports = User