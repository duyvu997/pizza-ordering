const jwt = require('jsonwebtoken');
const config =  require('./auth-conf');


// This file is only verify the token. 

let verifyUser = (request, response, next)=>{
    let token =  request.headers['x-access-token']|| request.headers['authorization'];
    if (token.startWith('Bearer ')){
        token = token.slice(7, token.lengh);  // remove Bearer from string
    }
    if (!token){
        return response.json({
            success:'false',
            message: 'auth token is not supplied'
        });       
    };
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err){
            return response.json({
                success: 'false',
                message: 'Token is not valid'
            });
        };

        request.decoded =  decoded;
        next();

    });
}

module.exports = {
    verifyUser
};









