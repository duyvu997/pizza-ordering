const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

let shopingCartSchema =  new Schema({
    userID =  Schema.Types.ObjectId,
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

const ShoppingCart = mongoose.model('ShoppingCart', shopingCartSchema);
module.exports = {
    ShoppingCart
};