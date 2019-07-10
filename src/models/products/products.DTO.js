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
            productImage    : item.product.productImage,      
            productNutrition: item.product.productNutrition,
            productCrust    : item.product.productCrust,
            productPrices   : this.convertPrice(item.product.productPrices)
        }))
    },
    convertPrice: function(priceData){
        return priceData.map(itemP=>{
            return {
                size: itemP.size,
                price: parseInt(itemP.price)
            }
        })
    },
    convertSignatureProductsToRecommend: function(signatureProduct){       
        return signatureProduct.products.map(item =>({
            _id             : item._id,
            productName     : item.productName,
            productCategory : item.productCategory, 
            productDesc     : item.productDesc,           
            productImage    : item.productImage,      
            productNutrition: item.productNutrition,
            productCrust    : item.productCrust,
            productPrices   : this.convertPrice(item.productPrices)
        }))
    },
    convertRecommendProducts: function (lstRecommend, signatureProducts){
        const rightSide = lstRecommend.map(item=>({
            _id             : item.product._id,
            productName     : item.product.productName,
            productCategory : item.product.productCategory, 
            productDesc     : item.product.productDesc,     
            productImage    : item.product.productImage,      
            productNutrition: item.product.productNutrition,
            productCrust    : item.product.productCrust,
            productPrices   : this.convertPrice(item.product.productPrices)
        }));
        const leftSide = this.convertSignatureProductsToRecommend(signatureProducts)
        return rightSide.concat(leftSide);
       
    }
}   