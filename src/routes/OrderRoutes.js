const orderController = require('../controllers/OrdersController');
const orderValidate = require('../validation/ordersValidate');
const Joi = require('@hapi/joi');
const services = require('../services/producer');

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
      description: 'Get current user\'s order',
      notes: ' Require token of user in header request',
      tags: ['api', 'orders']
    },
    handler: orderController.getLatestOrder
  });
  // server.route({
  //   method: 'POST',
  //   path: '/process',
  //   options: {
  //     validate: services.validatePayload,
  //     handler: services.sendMessage
  //   }
  // })
}