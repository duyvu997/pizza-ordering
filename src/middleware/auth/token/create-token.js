const jwt =  require('jsonwebtoken');
const config =  require('../../../config/auth-conf');

 const createToken =  (username, password) =>{
    // let username =  req.payload.username;
    // let password =  req.payload.password;

    // // fecth data from DB

    // let userNameinDB = 'adminaccount';
    // let passwordinDB = 'adminpassword';


    // if (!username || !password){
    //     return res.send(400).json({
    //         success: 'false',
    //         message: 'Authentication failed, please check the request!!'
    //     });
    // }

    // if (username!= userNameinDB || password != passwordinDB){
    //     return res.send(403).json({
    //         success: 'false',
    //         message: 'Invalid username or password, try again ! '
    //     });
    // }
    // // username and password is correct --> then create token and send it to client
    
    let token =  jwt.sign(
        { username, password },
        config.secret,
        { expiresIn:'24h' }
    );
    return token;

 }

 module.exports = {
     createToken
 }