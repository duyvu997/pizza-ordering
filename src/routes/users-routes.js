const userController = require('../controllers/user-controller');

module.exports = (server) => {
    server.route({
        method:'POST',
        path:'/users',
        handler: userController.createUser
        
    })

    server.route({
        method: 'POST',
        path:'/login',
        handler: userController.login
    })

    server.route({
        method: 'GET',
        path:'/users/{id}',
        handler: userController.getById
    })
}