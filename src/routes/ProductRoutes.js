const productController =  require('../controllers/ProductsController');
const productValidate =  require('../validation/productsValidate');

module.exports = (server) => { 
    server.route({
        method:'GET',        
        path:'/products',
        options:{
            handler: productController.getProductsByCategory,
            validate: productValidate.queryProduct,
            description: 'Get products by category query content like: /product?categories=classic/prenium/signature/  or not query param',
            tags:['api','products']
        }        
    })

    server.route({
        method:'GET',        
        path:'/products/bestseller',
        options:{
            handler: productController.findBestSellerProducts,
            description: 'Get bestseller products  ',
            tags:['api','products']
        }
    })
    server.route({
        method:'GET',        
        path:'/products/recommend',
        options:{
            handler: productController.findRecommendProducts,
            description: 'Get bestseller products  ',
            tags:['api','products']
        }
    })

    server.route({
        method:'GET',
        path:'/products/{id}',
        options:{
            handler: productController.getById,
            validate: productValidate.getById,
            description:'Get details of specific product',
            tags:['api', 'product'],
        }        
    })

    server.route({
        method:'POST',
        path:'/products',
        options:{
            handler: productController.create,
            description:'Create new product',
            tags:['api', 'product'],            
        },        
    })
}