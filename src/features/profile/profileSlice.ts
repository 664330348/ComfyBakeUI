import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';


export interface profileInfor{
    firstname: string | null;
    lastname: string | null;
    email: string | null,
    photo: string | null
}

const initialState:profileInfor ={
    firstname: null,
    lastname: null,
    email: null,
    photo: null
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers:{
        updateProfile:(state, action:PayloadAction<any>)=>{
            state.firstname = action.payload.firstname;
            state.lastname = action.payload.lastname;
            state.email = action.payload.email;
            state.photo = action.payload.photo;
        },
        clearProfile:(state)=>{
            state.firstname = null;
            state.lastname = null;
            state.email = null;
            state.photo = null;
        }
    }
})
export const selectProfile = (state:RootState)=>state.profile;
export const {updateProfile, clearProfile}=profileSlice.actions;
export default profileSlice.reducer; 