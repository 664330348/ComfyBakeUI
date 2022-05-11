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
        update:(state, action: PayloadAction<UserState>)=>{
            state.token = action.payload.token;
            state.role = action.payload.role;
        },
    }
})
export const selectUser = (state: RootState)=> state.user;
export const { update } = userSlice.actions;
export default userSlice.reducer;