module.exports = {
    convertReturnProductsByCategory :  function (populateData) {
        return {
            _id         : populateData._id,
            categoryName: populateData.categoryName,
            products    : populateData.products
        }
    },
    convertReturnBestSellerProducts: function (aggreateData){
        return aggreateData.map(x=>({
            _id             : x.product._id,
            productName     : x.product.productName,
            productCategory : x.product.productCategory, 
            productDesc     : x.product.productDesc,           
            productNutrition: x.product.productNutrition,
            productCrust    : x.product.productCrust,
            productPrices   : x.product.productPrices
        }))
    }
}   