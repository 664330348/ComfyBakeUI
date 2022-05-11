import Button from '@mui/material/Button';
import React, {useEffect, useState} from "react";
import axios from "axios";
import {authenticate } from "./remote/user-service";
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
        }else if (!currentUser.token || !currentUser.role){
            authenticate(cookies.principal.token).then((res)=>{                
                if(res.status===200){
                    dispatch(update({token:cookies.principal.token,role:res.data.role}));
                    navigate('home');
                }
            })
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