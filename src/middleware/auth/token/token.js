const jwt = require('jsonwebtoken');
const config = require('../../../config/env-conf');
const ERROR = require('../../../config/error');

const genarateToken = (userName, userEmail) => {
    try {
        let token = jwt.sign({
                userName,
                userEmail
            },
            config.auth.secretKey, {
                expiresIn: '24h'
            }
        );
        return token;
    } catch (err) {
        console.log('Error at genarate Token function');
        throw err;
    }
}

const verifyToken = (accessToken) => {
    try {
        
       return jwt.verify(accessToken, config.auth.secretKey, (err, decoded) => {
            if (err) {
                return ERROR.Code.FAILD_TO_VERIFY_TOKEN;
            };
            
            return decoded;
        });
    } catch (err) {
        console.log('Error at verify Token function');
        throw err;
    }

}

module.exports = {
    genarateToken,
    verifyToken
}