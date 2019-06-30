const addressController =  require('../controllers/AddressController');


module.exports = (server) => {
    server.route({
        method: 'POST',
        path: '/address',
        options:{
            description:'Create new address of user with user\'s access token',
            notes: 'Require user\' token.',
            tags:['api', 'address']
        },
        handler: addressController.create
    });
}