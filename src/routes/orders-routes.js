const orderController =  require('../controllers/order-controller');

module.exports = (server) => {
    server.route({
        method:'POST',
        path:'/orders',
        handler: orderController.create
    });
    
    server.route({
        method:'GET',
        path:'/orders',
        handler: orderController.getById
    })
}