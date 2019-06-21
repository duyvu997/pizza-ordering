const addressController =  require('../controllers/address-controller');


module.exports = (server) => {
    server.route({
        method: 'POST',
        path: '/address',
        handler: addressController.create
    });
}