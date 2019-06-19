const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

let addressSchema =  new Schema({
    userID:  Schema.Types.ObjectId,
    orderID : Schema.Types.ObjectId,
    addressDesc: String
});


const Address = mongoose.model('Address', addressSchema);


module.exports =  {
    Address
};