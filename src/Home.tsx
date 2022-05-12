import React, {useEffect, useState} from "react";
import {authenticate } from "./remote/user-service";
import {getAllBakedGoods} from "./remote/product-sevice";
import { useNavigate } from "react-router-dom";
import { useCookies} from 'react-cookie';
import { selectProducts, productInfor,updateProducts} from './features/product/productSlice';
//redux
import {useSelector, useDispatch} from 'react-redux';
import {selectUser, updateUserInfor} from './features/user/userSlice';
//MUI
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import ProductCard from "./features/product/productCard";

function HomePage(){
    const currentUser = useSelector(selectUser);
    const products = useSelector(selectProducts);
    const [cookies, setCookie, removeCookie] = useCookies(["principal"]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    useEffect(()=>{
        if(!cookies.principal){
            navigate('login');
        }else if (!currentUser.token || !currentUser.role){
            authenticate(cookies.principal.token).then((res)=>{                
                if(res.status===200){
                    dispatch(updateUserInfor({token:cookies.principal.token,role:res.data.role}));
                    navigate('home');
                }
            })
        }

        if(cookies.principal && products.length===0){
            getAllBakedGoods(cookies.principal.token).then((res)=>{
                console.log(res);
                dispatch(updateProducts(res.data.AllBakedGoods));
            });
        }
    },[]);

    return(
        <div>
            <Grid sx={{ flexGrow: 1,p:3 }} container >
                <Grid item xs={12}>
                    <Grid container justifyContent="center" spacing={5}>
                    {products.map((product) => (
                        <Grid key={product.bakeId} item>
                            <ProductCard
                                bakeId =  {product.bakeId}
                                bakeName = {product.bakeName}
                                described = {product.described}
                                image = {product.image}
                                price = {product.price}
                                quantity = {product.quantity}
                                recipe = {product.recipe}
                                userProfile = {product.userProfile}
                            />
                        </Grid>
                    ))}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default HomePage;