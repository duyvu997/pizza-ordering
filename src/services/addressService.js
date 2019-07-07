const Address = require('../models/address/addressModel');
const tokenTools = require('../middleware/auth/token/token');
const ERROR = require('../configuration/errorConstant');

const create = async function (accessToken, addressDesc) {
    try {
        const user = tokenTools.verifyToken(accessToken);
        console.log(user);
        const address = new Address();
        address.userID = user.userID;
        address.addressDesc = addressDesc;
        address.isDefault = true;

        return await address.save();
    } catch (err) {
        throw err;
    }

}
module.exports = {
    create
}