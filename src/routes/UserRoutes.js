const userController   = require('../controllers/UsersController');
const userValidate     = require('../validation/usersValidate');
const Joi = require('@hapi/joi')

module.exports         = (server) => {
    server.route({
        method         : 'POST',
        path           : '/users',
        options        : {
            description: 'Create a user',
            notes      : 'Return a token for this user',
            tags       : ['api','register'],
            validate   : userValidate.register,
            handler    : userController.register
        },

    });

    server.route({
        method         : 'POST',
        path           : '/login',
        options        : {
            validate   : userValidate.login,
            handler    : userController.login,
            description: 'Allow user login with username: by email, password',
            notes      : 'Return user\'s token if login success',
            tags       : ['api', 'login'],
            
        },
        
    });

    server.route({
        method         : 'GET',
        path           : '/users',
        options        : {
            description: 'Get profile of current user by access token',
            tags       : ['api', 'user'],
            handler    : userController.getProfile            
        },
    });
}