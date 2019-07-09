const Users = require('../models/users/usersModel');
const hashTools = require('../middleware/hash/hash');
const tokenTools = require('../middleware/auth/token/token');
const userDTO =  require('../models/users/user.DTO');
const ERROR = require('../configuration/errorConstant');


const create = async function (username, useremail, userpassword) {
    try {
        const isExist = await Users.findOne({
            userEmail: useremail
        });
        if (isExist) {
            return ERROR.Code.ALREADY_EXIST
        };

        let user = new Users();
        user.userName = username;
        user.userEmail = useremail;
        hashTools.cryptPassword(username, userpassword);
        const userDB = await user.save();

        return userDB;

    } catch (err) {
        throw err;
    }

}

const login = async (useremail, password) => {
    try {
        const user = await Users.findOne({
            userEmail: useremail
        });
        console.log(user)
        if (!user) {
            return ERROR.Code.EMAIL_NOT_FOUND;
        }
        //and then verify.
        const match = hashTools.verifyPassword(password, user.userPassword);
        console.log('isPasswordMatch: '+match);
        if (!match) {
            return ERROR.Code.PASSWORD_INVALID;
        }

        // at here match == true: --> return a token.    
        console.log(user._id)  ;
        const token = tokenTools.genarateToken(user._id);
        console.log(token);
       
        const data =  userDTO.convertLoginDataReturn(token, user)
        console.log(data);
        return data;

    } catch (err) {
        console.log('Something wrong in login function');
        throw err;
    }
}

const getProfile = async function (accessToken) {
    try {
        const user = tokenTools.verifyToken(accessToken);
        const userData = await Users.getById(user._id);
        const result =  userDTO.convertGetProfileDataReturn(userData);
        return result;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    create,
    login,
    getProfile
}