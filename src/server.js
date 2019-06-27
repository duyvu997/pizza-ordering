const Hapi = require("hapi");
const HapiSwagger = require('hapi-swagger');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const Database = require('./database/database');
const Qs =  require('qs')
require('dotenv').config();







async function StartServer() {
  await Database.connect;
  const server = new Hapi.server({
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 3636,
    query: {
      parser : (query)=> Qs.parse(query)
    }
  });
  await server.register([
    {
      name: 'Root',
      register: require('./routes/root-routes')
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