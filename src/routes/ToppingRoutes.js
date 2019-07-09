const toppingController =  require('../controllers/ToppingsController');
const toppingValidate = require('../validation/toppingsValidate');

module.exports = (server) => {
    server.route({
        method:'GET',
        path:'/toppings',
        options:{
            description: 'Get toppings by category query content like: /toppings?categories=meat/vegetable/sause/cheese or not query param',
            tags:['api', 'topping'],
            validate:  toppingValidate.queryTopping,
            handler: toppingController.getToppingsByCategory
        },
    });
}