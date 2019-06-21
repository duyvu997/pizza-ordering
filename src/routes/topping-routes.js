const toppingController =  require('../controllers/topping-controller');

module.exports = (server) => {
    server.route({
        method:'GET',
        path:'/toppings',
        handler: toppingController.getAll
    });
}