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

        if (ERROR.Code.ALREADY_EXIT === result ) {
            return h.response({
                statusCode: ERROR.Code.ALREADY_EXIT,
                message   : ERROR.Message.Already_exist
            });
        }

        const obj = {statusCode: ERROR.Code.CREATE, accessToken: result};

        return h.response(obj);

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
        

        if(userEmail === undefined||userPassword === undefined){
            return h.response('Invalid input').code(400);
        }
     
        const result = await services.login(userEmail, userPassword);
        console.log(result)
        if (ERROR.Code.INVALID === result || ERROR.Code.NOT_FOUND === result){
            const obj =  {statusCode: ERROR.Code.INVALID, message: ERROR.Message.Invalid}
            return h.response(obj);
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