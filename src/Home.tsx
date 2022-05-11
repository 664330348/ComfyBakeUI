import Button from '@mui/material/Button';
import React, {useEffect, useState} from "react";
import axios from "axios";
import { appClient } from "./remote/app-client";

import Register from './features/user/register';
import Navbar from './features/navbar';
import { useNavigate } from "react-router-dom";
import { useCookies} from 'react-cookie';

//redux
import {useSelector, useDispatch} from 'react-redux';
import {selectUser, update} from './features/user/userSlice';

function HomePage(){
    const currentUser = useSelector(selectUser);
    const [cookies, setCookie, removeCookie] = useCookies(["principal"]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    useEffect(()=>{
        if(!cookies.principal){
            navigate('login');
        }else if (!currentUser.token){
            dispatch(update(cookies.principal));
        }
    },[]);

    return(
        <div>
            <Navbar/>
            <h1>Home page</h1> 
        </div>
    )
}

export default HomePage;