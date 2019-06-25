const Hapi = require("hapi");
const HapiSwagger = require('hapi-swagger');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const database = require('./config/database');
const config = require('./config/env-conf')
require('dotenv').config();
async function StartServer() {
  await database.connect;
  const server = new Hapi.server({
    host: process.env.HOST || config.server.HOST,
    port: process.env.PORT || config.server.PORT
  });
  await server.register([
    {
      name: 'Root',
      register: require('./routes/routes')
    },{
      name: 'User-routes',
      register: require('./routes/users-routes')
    },
    {
      name: 'products-routes',
      register: require('./routes/products-routes')
    },
    {
      name: 'address-routes',
      register: require('./routes/address-routes')
    },
    {
      name: 'cart-routes',
      register: require('./routes/cart-routes')
    },
    {
      name: 'topping-routes',
      register: require('./routes/topping-routes')
    },
    {
      name: 'orders-routes',
      register: require('./routes/orders-routes')
    }
  ]);

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
    }
  ]);
  await server.start();

  console.log(`Server running at: ${server.info.uri}`);
}

StartServer().catch(err => {
  console.error(`StartServer failed: ${err.stack}`)
  process.exit(1)
});