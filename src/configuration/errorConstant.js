module.exports = {
    Code : {
        SUCCESS              : '200',
        CREATE               : '201',
        ALREADY_EXIST         : '409',
        PASSWORD_INVALID              : '400',
        FAILD_TO_VERIFY_TOKEN: '9000',        
        INVALID_TOTALPRICE   : '9001',
        REJECT_UPDATE        : '9002',
        EMAIL_NOT_FOUND: '9003',
        PASSWORD_INVALID: '9004',
    },
    Message : {
        Already_exist  : 'User already exist !!! Try again',
        Invalid        : 'Email or password is invalid !!! Try again.',
        InvalidObjectID: 'ObjectId is invalid !!!',
        InvalidToken   : 'Invalid Token. Try again !!!',
        InvalidPrice   : 'Total Price Invalid !!!',
        Success        : 'Success',
        Update_Status_Failed : 'Update failed, This order has been delivered/successful/cancelled, so it cannot be changed ',
        Update_Status_Success:'Update success',

        Register_Error:'Internal Server Error',
        Register_Success:'Register Success',

        Email_Not_Found:'Email has not been registered',
        Password_Invalid: 'Password invalid',
    }
}