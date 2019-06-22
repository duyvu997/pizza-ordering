const orderController =  require('../controllers/order-controller');

module.exports = (server) => {
    server.route({
        method:'POST',
        path:'/orders',
        options:{
            description:'Create order',
            notes: 'Require token of user in header request',
            tags:['api', 'orders']
        },
        handler: orderController.create
    });
    
    server.route({
        method:'GET',
        path:'/orders',
        options:{
            description:'Get current user\'s order',
            notes:' Require token of user in header request',
            tags:['api', 'orders']
        },
        handler: orderController.getById
    })
}