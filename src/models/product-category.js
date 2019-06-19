const mongoose =  require('mongoose');
const Schema =  mongoose.Schema;

let productCategorySchema =  new Schema({
    productID: Schema.Types.ObjectId,
    categoryID: Schema.Types.ObjectId
});

const ProductCategory = mongoose.model('ProductCategory', productCategorySchema);

module.exports = {
    ProductCategory
};