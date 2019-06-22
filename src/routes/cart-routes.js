const cartController =  require('../controllers/shopping-cart-controller');

module.exports = (server) => {
    server.route({
        method: 'GET',
        path:'/cart',
        options:{
            description:'Get current cart of user',
            tags:['api','cart']
        },
        handler: cartController.getCurrent
    })
}