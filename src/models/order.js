const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let orderSchema = new Schema({
    userID =  Schema.Types.ObjectId,
    orderDate: Schema.Types.Date,
    orderStatus: String,
    orderAddress: String,
    userPhone: Number,
    products: [{
        productID: {type:Schema.Types.ObjectId, ref: 'Product'},
        size: String,
        topping: [{
            toppingID: {type: Schema.Types.ObjectId,ref: 'Topping'}
        }],
        quantity: Number,
        crustType: String
    }]
});


const Order =  mongoose.model('Order', orderSchema);

module.exports = {
    Order 
};