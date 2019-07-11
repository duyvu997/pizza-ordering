const Hapi = require("hapi");
const HapiSwagger = require('hapi-swagger');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const Database = require('./middleware/database/initMongoDB');
const Qs =  require('qs')
const Consumer = require('../src/services/kafka/consumer.UpdateStatusOrder')
require('dotenv').config();




async function StartServer() {
  await Database.connect;
  const server = new Hapi.server({
    // host: 'localhost',
    port: process.env.PORT || 3646,
    query: {
      parser : (query)=> Qs.parse(query)
    }
  });
  await server.register([
    {
      name: 'Root',
      register: require('./routes/RootRoutes')
    },
    {
      name: 'User-routes',
      register: require('./routes/UserRoutes')
    },
    {
      name: 'products-routes',
      register: require('./routes/ProductRoutes')
    },
    {
      name: 'address-routes',
      register: require('./routes/AddressRoutes')
    },    
    {
      name: 'topping-routes',
      register: require('./routes/ToppingRoutes')
    },
    {
      name: 'orders-routes',
      register: require('./routes/OrderRoutes')
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
  
  Consumer
 
  console.log(`Server running at: ${server.info.uri}`);
}


StartServer().catch(err => {
  console.error(`StartServer failed: ${err.stack}`)

  process.exit(1)
});




