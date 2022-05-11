import Button from '@mui/material/Button';
import React, {useState} from "react";
import axios from "axios";
import { appClient } from "./remote/app-client";

import Register from './features/user/register';
import Navbar from './features/navbar';

function HomePage(){

    return(
        <div>
            <Navbar/>
            <h1>Home page</h1> 
        </div>
    )
}

export default HomePage;