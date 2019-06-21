const User = require('../models/user-model');
const secureTools = require('../middleware/auth/hash');

const create = async function (username, useremail, userpassword) {
    try{
        let user = new User();
        user.userName = username;
        user.userEmail = useremail;
        secureTools.cryptPassword(username,userpassword);
        return await user.save();
    
    }catch(err){
        throw err;
    }

}

const login =  function (userName, password) {
    // fetch data from DB
    const user =  fetchPaswordUser(userName);
    const passwordInDB = user.userPassword;
    const match = secureTools.verifyPassword(password, passwordInDB);

    if (!match){
        // throw err 
    }


}

const fetchUser = async function(userName){
    try{
        const result = await User.findOne({userPhone:userName}, function (err){  // user login by their phonenumber.
            if (err){
                throw err;
            }
        });
        return result;
    }catch(err){
        throw err;
    }
}

const getById = async function(userId){
    try{
        const result = await User.findOne({_id:userId}, function (err){
            if (err){
                throw err;
            }
        });
        return result;
    }catch(err){
        throw err;
    }
}

module.exports = {
    create,
    getById
}