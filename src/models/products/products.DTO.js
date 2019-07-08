module.exports = {
    convertReturnProductsByCategory :  function (populateData) {
        return {
            _id         : populateData._id,
            categoryName: populateData.categoryName,
            products    : populateData.products
        }
    },
    convertReturnBestSellerProducts: function (aggreateData){
        return aggreateData.map(item=>({
            _id             : item.product._id,
            productName     : item.product.productName,
            productCategory : item.product.productCategory, 
            productDesc     : item.product.productDesc,           
            productNutrition: item.product.productNutrition,
            productCrust    : item.product.productCrust,
            productPrices   : item.product.productPrices
        }))
    }
}   