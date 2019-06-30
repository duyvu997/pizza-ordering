const services = require('../services/addressService');


const create =async  function (request, h) {
    try {
        const accessToken = request.headers.accesstoken;
        // console.log(accessToken);
        const address = request.payload.address;
        // console.log(address);
        const result =await  services.create(accessToken, address);
        return h.response(result).code(200);
    } catch (err) {
        throw h.response(err).code(500);
    }

}



module.exports = {
    create
}