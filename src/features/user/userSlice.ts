import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface UserState{
    token: string | null;
    role: string | null;
}

const initialState:UserState={
    token: null,
    role: null
}

export const userSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        updateUserInfor:(state, action: PayloadAction<UserState>)=>{
            state.token = action.payload.token;
            state.role = action.payload.role;
        },
        clearUserInfor:(state)=>{
            state.token=null;
            state.role=null;
        }
    }
})
export const selectUser = (state: RootState)=> state.user;
export const { updateUserInfor,clearUserInfor } = userSlice.actions;
export default userSlice.reducer;