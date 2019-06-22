const productController =  require('../controllers/product-controller');

module.exports = (server) => { 
    server.route({
        method:'GET',
        path:'/products/category/{categoryName}',
        options:{
            description: 'Get products by category',
            tags:['api','products']
        },
        handler: productController.getListByCategory
    });

    server.route({
        method:'GET',
        path:'/products/{id}',
        options:{
            description:'Get details of specific product',
            tags:['api', 'product']
        },
        handler: productController.getById
    });
}