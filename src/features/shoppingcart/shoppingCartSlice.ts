import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface shoppingItemState{
    bakeId: string | null;
    bakeName: string | null;
    image: string | undefined;
    price: number | null;
    quantity: number | null;
    purchase: number | null;
    userProfileId: string | null;
}

const initialState:any = [];

export const shoppingCartSlice = createSlice({
    name:'shopping',
    initialState,
    reducers:{
        addItem:(state, action:PayloadAction<shoppingItemState>)=>{
            let found = false;
           
            for(let i=0; i<state.length; i+=2){
                if(state[i]===action.payload.bakeId && (state[i+1].purchase+1 <= state[i+1].quantity) ){
                    state[i+1].purchase++;
                    found=true;
                    break;
                }
            }
            if(found === false){
                state.push(action.payload.bakeId);
                state.push(action.payload);
            }
        }
    }
})
export const selectShoppingItems = (state:RootState)=>state.shoppingItems;
export const {addItem} = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;
