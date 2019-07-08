module.exports = {
    convertCreateOrderReturn:(orderData)=>{
        return {
            orderID: orderData._id,
            totalPrice: orderData.totalPrice
        }
    }
}