import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface UserState{
    token: string | null;
}

const initialState:UserState={
    token: null,
}

export const userSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        update:(state, action: PayloadAction<string>)=>{
            state.token = action.payload;
        },
    }
})
export const selectUser = (state: RootState)=> state.user;
export const { update } = userSlice.actions;
export default userSlice.reducer;