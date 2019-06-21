const cartController =  require('../controllers/shopping-cart-controller');

module.exports = (server) => {
    server.route({
        method: 'GET',
        path:'/cart',
        handler: cartController.getCurrent
    })
}