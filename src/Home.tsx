import Button from '@mui/material/Button';
import React, {useState} from "react";
import axios from "axios";
import { appClient } from "./remote/app-client";

import Register from './features/user/register';

function HomePage(){

    return(
        <div>
              <h1>Home page</h1> 
        </div>
    )
}

export default HomePage;