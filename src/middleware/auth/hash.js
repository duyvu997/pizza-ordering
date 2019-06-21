const bcrypt = require('bcrypt');
const Model =  require('../../models/user-model')
const saltRounds = 10;


const cryptPassword = async function (userName, userPassword) {
    await bcrypt.hash(userPassword, saltRounds, function (err, hash){
        if(err){
            throw err;
        }
        Model.updatePassword(userName, hash);
    });
}

// somePassword is a password user enter in textbox
// hash is a password was hash in DB
const verifyPassword = async function (somePassword, hash) {
    return await bcrypt.compare(somePassword, hash);
}


module.exports = {
    cryptPassword,
    verifyPassword
}