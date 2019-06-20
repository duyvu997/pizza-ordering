const Hapi = require('hapi');
const database = require('./database');
const config =  require('./config/server-config');
async function init () {
    await database.connect;
    const server = new Hapi.server({
      host: config.HOST,
      port: config.PORT
    })
    
    await server.register([
        {
            name: 'User Routes',
            register: require('./routes/user')
        },

    ]);
  
    await server.start()
  
    console.log(`Server running at: ${server.info.uri}`)
  }
  
init().catch(err => {
    console.error(`StartServer failed: ${err.stack}`)
    process.exit(1)
});

