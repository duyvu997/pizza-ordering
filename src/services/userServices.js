const Users = require('../models/users/usersModel');
const hashTools = require('../middleware/hash/hash');
const tokenTools = require('../middleware/auth/token/token');
const userDTO =  require('../models/users/user.DTO');
const ERROR = require('../configuration/errorConstant');
var generator = require('generate-password');
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'devteamtastypizza@gmail.com',
        pass: 'maimaiyem'
    }
});



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
        hashTools.cryptPassword(useremail, userpassword);
        const userDB = await user.save();

        return userDB;

    } catch (err) {
        throw err;
    }

}
const update = async function (userID,objData) {
    try {
        const isExist = await Users.findOne({
            _id: userID
        });
        if (!isExist) {
            return ERROR.Code.USER_NOT_FOUND;
        };
        // const result =  await Users.findByIdAndUpdate({_id: userID},{$set:{userName: uname, userEmail: uemail, userAddress: uaddress, userPhone: uphone}});
        const result =  await Users.findByIdAndUpdate(userID,objData);

        return result;

    } catch (err) {
        throw err;
    }

}
const resetPassword = async function(userEmail){
    try{

        const isExist = await Users.findOne({
            userEmail: userEmail
        });
        if (!isExist) {
            return ERROR.Code.USER_NOT_FOUND;
        };
        const password = generator.generate({
            length: 10,
            numbers: true
        });
        hashTools.cryptPassword(userEmail, password);

        var mailOptions = {
            from: 'duyghjha2@gmail.com',
            to: userEmail,
            subject: 'RESET PASSWORD',
            text: 'Your password was reset to: '+ password
        };
        return await transporter.sendMail(mailOptions);
    }catch(err){
        console.log(err);
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
        console.log('isPasswordMatch: '+ match);
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

const getProfile = async function (userID) {
    try {
        const userData = await Users.getById(userID);
        const result =  userDTO.convertGetProfileDataReturn(userData);
        return result;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    update,
    create,
    login,
    getProfile,
    resetPassword
}