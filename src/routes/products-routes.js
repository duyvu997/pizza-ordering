const productController =  require('../controllers/product-controller');

module.exports = (server) => { 
    server.route({
        method:'GET',
        path:'/products/category/{id}',
        handler: productController.getListByCategory
    });

    server.route({
        method:'GET',
        path:'/products/{id}',
        handler: productController.getById
    });
}