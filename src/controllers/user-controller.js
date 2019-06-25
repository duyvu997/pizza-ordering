const services = require('../services/user-services');
const Boom = require('@hapi/boom');
const ERROR = require('../config/error')


module.exports.register = async (req, h) => {
    try {

        const {
            userName,
            userEmail,
            userPassword
        } = req.payload;

        const result = await services.create(userName, userEmail, userPassword);

        if (ERROR.Code.ALREADY_EXIT === result ) {
            return h.response({
                statusCode: ERROR.Code.ALREADY_EXIT,
                message   : ERROR.Message.Already_exist
            })
        }

        const obj = {statusCode: ERROR.Code.CREATE, accessToken: result}

        return h.response(obj);

    } catch (err) {
        return h.response(err).code(500);
    }

}

module.exports.login = async (req, h) => {
    try {

        const {
            userEmail,
            password
        } = req.payload;
        const result = await services.login(userEmail, password);
        if (ERROR.Code.INVALID === result || ERROR.Code.NOT_FOUND === result){
            const obj =  {statusCode: ERROR.Code.INVALID, message: ERROR.Message.Invalid}
            return h.response(obj);
        }

        const obj ={statusCode: ERROR.Code.SUCCESS , accessToken: result }

        return h.response(obj);

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