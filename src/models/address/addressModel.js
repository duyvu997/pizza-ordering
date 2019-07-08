const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

let addressSchema =  new Schema({
    // _id: false,
    userID:  Schema.Types.ObjectId,    
    addressDesc: String,
    isDefault : Boolean
});


const Address = mongoose.model('Address', addressSchema);


module.exports = Address
