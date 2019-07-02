const productController =  require('../controllers/ProductsController');
const productValidate =  require('../validation/productsValidate');

module.exports = (server) => { 
    server.route({
        method:'GET',
        
        path:'/products',
        options:{
            description: 'Get products by category query content like: /product?categories=classic',
            tags:['api','products']
        },
        handler: productController.getListByCategory
    })

    server.route({
        method:'GET',
        
        path:'/products/bestseller',
        options:{
            description: 'Get bestseller products',
            tags:['api','products']
        },
        handler: productController.findBestSellerProducts   
    })

    server.route({
        method:'GET',
        path:'/products/{id}',
        options:{
            description:'Get details of specific product',
            tags:['api', 'product'],
            
        },
        handler: productController.getById
    })
}