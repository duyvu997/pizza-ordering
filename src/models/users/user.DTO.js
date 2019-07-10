module.exports = {
    convertLoginDataReturn : (token, userData)=> {
        return {
            token: token,
            userName: userData.userName,
            userEmail: userData.userEmail,
            userAddress: userData.userAddress,
            userPhone: userData.userPhone,
            userPoint: userData.userPoint
        }

    },
    convertGetProfileDataReturn:(userData)=>{
        return {
            
            userName: userData.userName,
            userEmail: userData.userEmail,
            userAddress: userData.userAddress,
            userPhone: userData.userPhone,
            userPoint: userData.userPoint
        }

    },
    convertLogin:(userData)=>{
        
        return {
            
            userName: userData.userName,
            userEmail: userData.userEmail,
            userAddress: userData.userAddress,
            userPhone: userData.userPhone,
            userPoint: userData.userPoint
        }
    }
}