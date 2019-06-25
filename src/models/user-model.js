const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

let userSchema =  new mongoose.Schema({
    userName: String,
    userEmail: String,
    userPassword: String,
    
    

});

userSchema.statics.updatePassword = function updatePassword(username, somepassword){
    this.findOneAndUpdate({userName: username}, {$set:{userPassword:somepassword}},  //conditions and value to update
        function (err){ // call back function
        if (err){
            throw err;
        }
    })
}

userSchema.statics.getById =  function getById(userID){
    return this.findOne({
        _id: userID //conditions
    },
    function (err) { // callback 
        if (err) {
            return Boom.internal('Error in Database');
        }
    });
}


const User =  mongoose.model('User', userSchema);

module.exports = User
    
