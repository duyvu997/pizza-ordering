const Hapi = require('hapi');
const database = require('./database');
const config =  require('./config/server-config');
const init = async () => {
    const server = Hapi.server({host: config.HOST, port: config.PORT});


    // Plugin 
    await server.register([
        { register: require('./routes')  },

    ], // if plugin err
    (err)=> {
        if (err) {
            throw err;
        }
    });
    server.start();
    console.log('Server running on %s:', server.info.uri);
    await database.connect;
};



// log err if init server have error
process.on('unhandledRejection', (err)=>{
    console.log(err);
    process.exit(1);
});


init();