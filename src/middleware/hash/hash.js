const bcrypt = require('bcrypt');
const Model =  require('../../models/users/usersModel')
const saltRounds = 10;


const cryptPassword = async function (userEmail, userPassword) {
    await bcrypt.hash(userPassword, saltRounds, function (err, passHash){
        if(err){
            throw err;
        }
        Model.updatePassword(userEmail, passHash);
    });
}

// somePassword is a password user enter in textbox
// hash is a password was hash in DB
const verifyPassword =  function (somePassword, hash) {
    return bcrypt.compareSync(somePassword, hash);
}


module.exports = {
    cryptPassword,
    verifyPassword
}