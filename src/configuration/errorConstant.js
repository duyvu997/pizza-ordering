module.exports = {
    Code : {
        SUCCESS              : '200',
        CREATE               : '201',
        
       
        FAILD_TO_VERIFY_TOKEN: '9000',        
        // code series 9000 for User
        UNAUTHORIZED         : '9000',
        ALREADY_EXIST        : '9001',
        PASSWORD_INVALID     : '9002',
        EMAIL_NOT_FOUND      : '9003',
        PASSWORD_INVALID     : '9004',
        USER_NOT_FOUND: '9005',

        // code series 8000 for Products
        INVALID_TOTAL_PRICE   : '8001',
        REJECT_UPDATE        : '8002',
            PRODUCT_NOT_FOUND:'8003',

        //code series 7000 for Orthers

        VALIDATE_FAILED:'10001'
    },
    Message : {
        Already_Exist  : 'User already exist !!! Try again',
        Invalid        : 'Email or password is invalid !!! Try again.',
        InvalidObjectID: 'ObjectId is invalid !!!',
        Invalid_Token   : 'Invalid Token. Try again !!!',
        InvalidPrice   : 'Total Price Invalid !!!',
        Success        : 'Success',
        Update_Status_Failed : 'Update failed, This order has been delivered/successful/cancelled, so it cannot be changed ',
        Can_Not_Update: 'No Order Found',
        Update_Status_Success:'Update success',

        Register_Error:'Internal Server Error',
        Register_Success:'Register Success',
        Update_Profilce_Success: 'Update Profile Success',

        Email_Not_Found:'Email has not been registered',
        Password_Invalid: 'Password invalid',
        User_Not_Regiser:'User has been not register',
        Product_Not_Found:'Product not found',
    }
}