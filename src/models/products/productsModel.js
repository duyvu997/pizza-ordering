const mongoose = require('mongoose');
const Boom = require('@hapi/boom');
const Schema = mongoose.Schema;

let productSchema = new Schema({
    productName: String,
    productCategory: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    productDesc: String,
    productNutrition: String,
    productPrices: [{
        size: String,
        price: Number
    }],
    productImangeUrl: String,
    productTag: String

});


productSchema.statics.getById = async function getById(productID) {
    return await this.findOne({
        _id: productID //conditions
    },
        function (err) { // callback 
            if (err) {
                throw err;
            }
        });
}
productSchema.statics.getPrice = async function getPrice(productID, productSize) {
    try {
        const product = await Product.getById(productID);
        if (!product) {
            throw new Error(['Product not found', productID]);
        }
        const prices = product.productPrices; // list prices + size
        // find price dependence on size
        const result = prices.find(price => price.size === productSize);
        return result.price
    } catch (err) {
        console.log("BUG on getPrice");
        
        throw err;
    }

}

const Product = mongoose.model('Product', productSchema);

module.exports = Product