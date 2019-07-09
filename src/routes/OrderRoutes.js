const orderController = require('../controllers/OrdersController');
const orderValidate = require('../validation/ordersValidate');
const Joi = require('@hapi/joi');


module.exports = (server) => {
  server.route({
    method: 'POST',
    path: '/orders',
    options: {
      description: 'Create order',
      notes: 'Require token of user in header request',
      tags: ['api', 'orders'],
      validate: orderValidate.create,
      plugins: {
        'hapi-swagger': {
          responses: {
            500: {
              description: 'Internal Server Error',
              schema: Joi.object({
                statusCode: Joi.number().default(500),
                message: Joi.string(),
                error: Joi.string(),
              }),
            },
          },
        },
      },
    },
    handler: orderController.create
  });

  server.route({
    method: 'GET',
    path: '/orders',
    options: {
      handler: orderController.getAllOrders,
      validate: orderValidate.getAllOrders,
      description: 'Get current user\'s order',
      notes: ' Require token of user in header request',
      tags: ['api', 'orders']
    }
  });
  server.route({
    method: 'PUT',
    path: '/orders/{id}',
    options: {
      handler: orderController.updateOrderStatus,  
      validate: orderValidate.updateStatusOrder,    
      description: 'Update current user\'s order',
      notes: ' Require token of user in header request',
      tags: ['api', 'orders']
    }
  });

}