const services = require('../services/userServices');
const Boom = require('@hapi/boom');
const ERROR = require('../configuration/errorConstant')


module.exports.register = async (req, h) => {
    try {

        const {
            userName,
            userEmail,
            userPassword
        } = req.payload;

        const result = await services.create(userName, userEmail, userPassword);
        
        if (ERROR.Code.ALREADY_EXIST === result ) {
            return h.response({message   : ERROR.Message.Already_exist}).code(400);
        }

        if(!result) {
            return h.response({message:ERROR.Message.Register_Error}).code(500);
        }

        return h.response({message:ERROR.Message.Register_Success}).code(200);

    } catch (err) {
        return h.response(err).code(500);
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
        
        if( ERROR.Code.EMAIL_NOT_FOUND === result){            
            return h.response({message:ERROR.Message.Email_Not_Found}).code(400);
        }

        if (ERROR.Code.PASSWORD_INVALID === result ){
            return h.response({message:ERROR.Message.Password_Invalid}).code(400);
        } 
        
        return h.response(result).code(200);

    } catch (err) {
        throw err;
    }
}

module.exports.getProfile = async (request, h) => {
    try {

        const accessToken = request.headers.accesstoken;    
        const result = await services.getProfile(accessToken);

        return h.response(result).code(200);
    } catch (err) {
        throw err;
    }
}