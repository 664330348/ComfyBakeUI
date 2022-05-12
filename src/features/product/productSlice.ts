import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface bakerProfileInfor{
    userProfileId: string | null;
    email: string | null;
    firstname: string | null;
    lastname: string | null;
    photo: string | null;
}

export interface productInfor{
    bakeId: string | null;
    bakeName: string | null;
    described: string | null;
    image: string | undefined;
    price: number | null;
    quantity: number | null;
    recipe: string | null;
    userProfile: bakerProfileInfor;
}

const initialState: productInfor[]=[];

export const productSlice = createSlice({
    name:'produce',
    initialState,
    reducers:{
        addProduct:(state, action:PayloadAction<productInfor>)=>{
            state.push(action.payload);
        },
        updateProducts:(state,action:PayloadAction<productInfor[]>)=>{            
            state.length = 0;
          
            action.payload.forEach((product: productInfor) => {
                state.push(product);
            });
        },
        clearProducts:(state)=>{
            state.length=0;
        }
    }
})
export const selectProducts = (state:RootState)=> state.products;
export const {addProduct, updateProducts, clearProducts} = productSlice.actions;
export default productSlice.reducer;