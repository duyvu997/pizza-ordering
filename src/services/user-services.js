const Users = require('../models/user-model');
const hashTools = require('../middleware/hash/hash');
const tokenTools = require('../middleware/auth/token/token');
const Boom = require('@hapi/boom');
const ERROR = require('../config/error');


const create = async function (username, useremail, userpassword) {
    try {
        const isExist = await Users.findOne({
            userEmail: useremail
        });
        if (isExist) {
            return ERROR.Code.ALREADY_EXIT
        };

        // create new model will move to user-models file
        let user = new Users();
        user.userName = username;
        user.userEmail = useremail;
        hashTools.cryptPassword(username, userpassword);
        user.save();

        const token = tokenTools.genarateToken(username, useremail);

        return token;

    } catch (err) {
        throw err;
    }

}

const login = async (useremail, password) => {
    try {
        const user = await Users.findOne({
            userEmail: useremail
        });
    
        if (!user) {
            return ERROR.Code.NOT_FOUND;
        }
        //and then verify.
        const match = hashTools.verifyPassword(password, user.userPassword);
        
        if (!match) {
            return ERROR.Code.INVALID;
        }
        
        // at here match == true: --> return a token.      
        const token = tokenTools.genarateToken(user.userName, user.userEmail);
        return token;

    } catch (err) {
        console.log('Something wrong in login function');
        throw err;
    }
}



const getProfile = async function (accessToken) {
    try {
        const user = tokenTools.verifyToken(accessToken);
        console.log(user);
        return await Users.getByEmail(user.userEmail);
    } catch (err) {
        throw err;
    }
}

module.exports = {
    create,
    login,
    getProfile
}