const toppingController =  require('../controllers/topping-controller');

module.exports = (server) => {
    server.route({
        method:'GET',
        path:'/toppings',
        options:{
            description:'Get all toppings',
            tags:['api', 'topping'] 
        },
        handler: toppingController.getAll
    });
}