const User = require('../models/user-model');
const hashTools = require('../middleware/hash/hash');
const tokenTools = require('../middleware/auth/token/create')
const Boom = require('@hapi/boom')
const create = async function (username, useremail, userpassword) {
    try {
        let user = new User();
        user.userName = username;
        user.userEmail = useremail;
        hashTools.cryptPassword(username, userpassword);
        return await user.save();

    } catch (err) {
        throw err;
    }

}

const login = async (username, password) => {
    try {
        console.log(username);
        // fetch data from DB
        const userInDB = await fetchUserFromDB(username);
        // if user not exist in DB =>> 
        // if user exist in DB , get username and password 
        console.log(userInDB);
        let usernameInDB = userInDB.userEmail;
        let passwordInDB = userInDB.userPassword;
        //and then verify.
        const match = hashTools.verifyPassword(password, passwordInDB);

        if (username != usernameInDB || !match) {
            return "something wrong";
        }
        // at here match == true: --> return a token.      
        const token = tokenTools.createToken(username, password);
        return token;

    } catch (err) {
        console.log(err);
        Boom.internal('login error');
    }
}

const fetchUserFromDB = async (userName) => {
    try {
        const result = await User.findOne({
            userEmail: userName
        })
        if (!result) {
            throw Boom.notFound
        }
        return result;
    } catch (err) {
        throw Boom.internal('Error in DB');
    }
}

const getById = async function (userId) {
    try {
        return await User.getById(userId);
    } catch (err) {
        throw err;
    }
}

module.exports = {
    create,
    login,
    getById
}