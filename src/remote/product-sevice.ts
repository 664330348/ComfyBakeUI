import { appClient } from "./app-client";
import { productInfor} from '../features/product/productSlice';


export const getAllBakedGoods = async (token:string | null)=>{
    return await appClient.get("baked-goods",{
        headers:{
            'Authorization':`${token}`
        }
    })
}