import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface orderItemState{
    itemName: string | null;
    itemImage: string | null;
    itemPrice: number | null;
    quantity: number | null;
}

export interface orderState{
    totalCost: number | null;
    completedTime: Date | null;
    orderItemResponses: orderItemState[] | null;
}
const initialState: orderState[] = [];

export const ordersSlice=createSlice({
    name:'orders',
    initialState,
    reducers:{
        updateOrderHistory:(state, action:PayloadAction<orderState[]>)=>{
            state.length = 0;
          
            action.payload.forEach((order: orderState) => {
                state.push(order);
            });
        },
        clearOrderHistory:(state)=>{
            state.length=0;
        }
    }
})

export const selectOrderHistory = (state:RootState)=>state.orders;
export const {updateOrderHistory, clearOrderHistory} = ordersSlice.actions;
export default ordersSlice.reducer;

