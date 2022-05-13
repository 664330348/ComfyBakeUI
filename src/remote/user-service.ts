import { appClient } from "./app-client";

export const register = async (userInfo:object) => {
    return await appClient.post("/users/registration",userInfo);
}

export const login = async (loginInfo: object)=>{
    return await appClient.post("/users/login",loginInfo);
}

export const authenticate = async (token:string | null)=>{
    return await appClient.get("users",{
        headers:{
            'Authorization':`${token}`
        }
    })
}

export const getUserProfile = async(token:string | null)=>{
    return await appClient.get("users/profile",{
        headers:{
            'Authorization':`${token}`
        }
    })
}

export const updateUserProfile =async (token:string | null, newProfileInfo:object) => {
    return await appClient.put("users/profile", newProfileInfo,{
        headers:{
            'Authorization':`${token}`
        }
    })
}