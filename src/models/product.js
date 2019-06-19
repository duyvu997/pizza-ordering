const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let productSchema = new Schema({
    productName:String,
    productDesc:String,
    productNutrition:String,
    productImangeUrl: String,

});

const Product = mongoose.model('Product', productSchema);

module.exports = {
    Product
};