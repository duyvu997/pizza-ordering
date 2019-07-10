const services = require('../services/userServices');
const Boom = require('@hapi/boom');
const ERROR = require('../configuration/errorConstant');
const tokenTools = require('../middleware/auth/token/token');
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'duyghjha2@gmail.com',
        pass: '147258thuha'
    }
});

module.exports.forgotPassword = async(req,h) => {
    try{
        const email =  req.payload.userEmail;
        const result =await  services.resetPassword(email);
        if (ERROR.Code.USER_NOT_FOUND == result) {
            return h.response({ statusCode: ERROR.Code.USER_NOT_FOUND, message: ERROR.Message.User_Not_Regiser })
        }
        let message ;
        if (result) {
            message = {message: 'Password will send to your Email in few minute'};
        }
        return h.response(message).code(200);

    }catch(err){
        console.log(err);
        throw err;
    }

}
module.exports.register = async (req, h) => {
    try {

        const {
            userName,
            userEmail,
            userPassword
        } = req.payload;

        const result = await services.create(userName, userEmail, userPassword);

        if (ERROR.Code.ALREADY_EXIST == result) {
            return h.response({ statusCode: ERROR.Code.ALREADY_EXIST, message: ERROR.Message.Already_Exist }).code(400);
        }

        if (!result) {
            return h.response({ message: ERROR.Message.Register_Error }).code(500);
        }

        return h.response({ message: ERROR.Message.Register_Success }).code(200);

    } catch (err) {
        console.log(err);
        throw err;
    }
}
module.exports.update = async (req, h) => {
    try {
        const accessToken = req.headers.accesstoken;

        const decodedUser = tokenTools.verifyToken(accessToken);

        if (ERROR.Code.FAILD_TO_VERIFY_TOKEN === decodedUser) {
            return h.response({ statusCode: ERROR.Code.UNAUTHORIZED, message: ERROR.Message.Invalid_Token }).code(400);
        }

        const objData = req.payload;

        const result = await services.update(decodedUser._id, objData);

        if (ERROR.Code.USER_NOT_FOUND == result) {
            return h.response({ statusCode: ERROR.Code.USER_NOT_FOUND, message: ERROR.Message.User_Not_Regiser })
        }

        return h.response({ message: ERROR.Message.Update_Profilce_Success }).code(200);

    } catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports.login = async (req, h) => {
    try {

        const {
            userEmail,
            userPassword
        } = req.payload;

        const result = await services.login(userEmail, userPassword);
        console.log(result);

        if (ERROR.Code.EMAIL_NOT_FOUND === result) {
            return h.response({ statusCode: ERROR.Code.EMAIL_NOT_FOUND, message: ERROR.Message.Email_Not_Found }).code(400);
        }

        if (ERROR.Code.PASSWORD_INVALID === result) {
            return h.response({ statusCode: ERROR.Code.PASSWORD_INVALID, message: ERROR.Message.Password_Invalid }).code(400);
        }

        return h.response(result).code(200);

    } catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports.getProfile = async (request, h) => {
    try {

        const accessToken = request.headers.accesstoken;

        const decodedUser = tokenTools.verifyToken(accessToken);

        if (ERROR.Code.FAILD_TO_VERIFY_TOKEN === decodedUser) {
            return h.response({ statusCode: ERROR.Code.UNAUTHORIZED, message: ERROR.Message.Invalid_Token }).code(400);
        }

        const result = await services.getProfile(decodedUser._id);

        return h.response(result).code(200);

    } catch (err) {
        console.log(err);
        throw err;
    }
}