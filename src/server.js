const Hapi = require("hapi");
const database = require('./config/database');
const config = require('./config/env-config')
async function StartServer () {
    await database.connect;
    const server = new Hapi.server({
      host: config.server.HOST,
      port: config.server.PORT
    });
    
    await server.register([{
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
    }]);
    
    await server.start();
  
    console.log(`Server running at: ${server.info.uri}`);
  }
  
StartServer().catch(err => {
    console.error(`StartServer failed: ${err.stack}`)
    process.exit(1)
  });
