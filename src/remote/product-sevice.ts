import { appClient } from "./app-client";


export const getAllBakedGoods = async (token:string | null)=>{
    return await appClient.get("baked-goods",{
        headers:{
            'Authorization':`${token}`
        }
    })
}

export const getOrderHistory =async (token:string | null) => {
    return await appClient.get("baked-goods/history",{
        headers:{
            'Authorization':`${token}`
        }
    })
}

