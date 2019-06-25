const userController   = require('../controllers/user-controller');
const userValidate     = require('../validation/user-validate');
const Joi = require('@hapi/joi')

module.exports         = (server)                       => {
    server.route({
        method         : 'POST',
        path           : '/users',

        options        : {
            description: 'Create a user',
            notes      : 'Return a token for this user',
            tags       : ['api','register'],
            validate   : userValidate.register
        },
        handler        : userController.register

    });

    server.route({
        method         : 'POST',
        path           : '/login',
        options        : {
            description: 'Allow user login with username: by email, password',
            notes      : 'Return user\'s token if login success',
            tags       : ['api', 'login'],
            
        },
        handler        : userController.login
        
    });

    server.route({
        method         : 'GET',
        path           : '/users/{id}',
        options        : {
            description: 'Get profile of current user',
            tags       : ['api', 'user'],
            
        },
        handler        : userController.getById
    });
}