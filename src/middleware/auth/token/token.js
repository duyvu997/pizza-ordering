const jwt = require('jsonwebtoken');
const config = require('../../../configuration/envConfiguration');
const ERROR = require('../../../configuration/errorConstant');

const genarateToken = (_id) => {
    try {
       
        let token = jwt.sign({
                _id
            },
            config.auth.secretKey, {
                expiresIn: '2400h'
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