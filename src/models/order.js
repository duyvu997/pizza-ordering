const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let orderSchema = new Schema({
    userID =  Schema.Types.ObjectId,
    orderDate: Schema.Types.Date,
    orderStatus: String,
    orderAddress: String,
    userPhone: Number,
    products: [{
        productID: Schema.Types.ObjectId,
        size: String,
        topping: [{
            toppingID: Schema.Types.ObjectId,
        }],
        quantity: Number,
        crustType: String
    }]
});


const Order =  mongoose.model('Order', orderSchema);

module.exports = {
    Order 
};