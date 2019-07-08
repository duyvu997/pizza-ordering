module.exports = {
    convertLoginDataReturn : (token, userData)=> {
        return {
            token: token,
            userName: userData.userName,
            userEmail: userData.userEmail,
            userAddress: userData.userAddress,
            userPhone: userData.userPhone
        }

    },
    convertGetProfileDataReturn:(userData)=>{
        return {
            
            userName: userData.userName,
            userEmail: userData.userEmail,
            userAddress: userData.userAddress,
            userPhone: userData.userPhone
        }

    }
}