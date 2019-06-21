const Hapi = require("hapi");
const database = require('./config/database');
const config = require('./config/env-config')
async function StartServer () {
    await database.connect;
    const server = new Hapi.server({
      host: config.server.HOST,
      port: config.server.PORT
    });
    
    await server.register({
      name: 'User-routes',
      register: require('./routes/users-routes')
    });
    
    await server.start();
  
    console.log(`Server running at: ${server.info.uri}`);
  }
  
StartServer().catch(err => {
    console.error(`StartServer failed: ${err.stack}`)
    process.exit(1)
  });
