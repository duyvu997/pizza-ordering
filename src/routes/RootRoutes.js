const services =  require('../services/producer')


module.exports = (server)=>{
    server.route({
        method:'GET',
        path: '/',
        handler : (res, h)=>{
            return 'Welcome to PizzaOrder Application on Heroku :)'
        }
    });
    server.route({
        method:'GET',
        path: '/favicon.ico',
        handler : (res, h)=>{
            return 'favicon.ico'
        }
    });
    server.route({
        method:'POST',
        path: '/process',
        options:{
            validate: services.validatePayload
        },
        handler : services.sendMessage
        
    });

}