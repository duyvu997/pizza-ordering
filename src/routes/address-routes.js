const addressController =  require('../controllers/address-controller');


module.exports = (server) => {
    server.route({
        method: 'POST',
        path: '/address',
        options:{
            description:'Create new address of user',
            notes: 'Require user\' token.',
            tags:['api', 'address']
        },
        handler: addressController.create
    });
}