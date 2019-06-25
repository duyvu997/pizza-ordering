const services = require('../services/user-services');
const Boom = require('@hapi/boom');



module.exports.register = async (req, h) => {
    try {

        const {
            userName,
            userEmail,
            userPassword
        } = req.payload;
        const result = await services.create(userName, userEmail, userPassword);

        return h.response(result).code(201);
    } catch (err) {
        return h.badRequest();
    }

}

module.exports.login = async (req, h) => {
    try {

        const {
            userName,
            password
        } = req.payload;
        const token = await services.login(userName, password);

        return h.response(token).code(200);

    } catch (err) {
        throw err;
    }
}

module.exports.getById = async (request, h) => {
    try {

        const userID = request.params.id;
        const result = await services.getById(userID);

        return h.response(result).code(200);
    } catch (err) {
        throw err;
    }
}