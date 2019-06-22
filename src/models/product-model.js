const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let productSchema = new Schema({
    productName:String,
    productDesc:String,
    productNutrition:String,
    productImangeUrl: String,

});


productSchema.statics.getById = async function getById (productID){
    return this.find({_id:productID});
}

const Product = mongoose.model('Product', productSchema);

module.exports = {
    Product
};