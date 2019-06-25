module.exports = (server)=>{
    server.route({
        method:'GET',
        path: '/',
        handler : (res, h)=>{
            return 'heroku'
        }
    });
    server.route({
        method:'GET',
        path: '/favicon.ico',
        handler : (res, h)=>{
            return 'favicon.ico'
        }
    });

}