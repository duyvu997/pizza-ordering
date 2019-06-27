const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

let shopingCartSchema =  new Schema({
    userID =  Schema.Types.ObjectId,
    products: [{
        productID: {type: Schema.Types.ObjectId, ref: 'Product'},
        size: String,
        topping: [{
            toppingID:{type: Schema.Types.ObjectId, ref: 'Topping'}
        }],
        quantity: Number,
        crustType: String
    }]
    
});

const ShoppingCart = mongoose.model('ShoppingCart', shopingCartSchema);
module.exports = {
    ShoppingCart
};