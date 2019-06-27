const productController =  require('../controllers/product-controller');
const productValidate =  require('../validation/product-validate');

module.exports = (server) => { 
    server.route({
        method:'GET',
        
        path:'/products',
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
            tags:['api', 'product'],
            
        },
        handler: productController.getById
    });
}