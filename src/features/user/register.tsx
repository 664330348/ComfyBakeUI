import React, {useState, useEffect} from "react";
import { register,authenticate } from "../../remote/user-service";
import { useNavigate } from "react-router-dom";
import { useCookies} from 'react-cookie';

//MaterialUI
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

//Redux
import {useSelector, useDispatch} from 'react-redux';
import {update, selectUser} from './userSlice';

function Register (){
    const [errorMsg, setErrorMsg] = useState('');
    const [cookies] = useCookies(["principal"]);
    const currentUser = useSelector(selectUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        if (cookies.principal && (!currentUser.token || !currentUser.role)){
            authenticate(cookies.principal.token).then((res)=>{
                if(res.status===200){
                    dispatch(update({token:cookies.principal.token,role:res.data.role}));
                    navigate('home');
                }
            })
        }
    },[]);

    const handleRegister =(event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        
        if(data.get('username') && data.get('firstName') && data.get('lastName') && data.get('password')){
            let formInfo={
                username:data.get('username'),
                firstName:data.get('firstName'),
                lastName:data.get('lastName'),
                email:data.get('email'),
                password:data.get('password'),
            }
            register(formInfo).then((res)=>{
                if (res.status===201){
                    navigate("/login");
                }else{
                    setErrorMsg(res.data.message)
                }
            });
        }else{
            setErrorMsg("please fill in required info.")
        }
    }

    return(
        <Container maxWidth="xs" sx={{marginTop: 8}}>
            <h3>Register page</h3>
            <Box component="form" noValidate onSubmit={handleRegister} 
            >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoFocus
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    autoFocus
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoFocus
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    />
                </Grid>

                <Grid item xs={12}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 1, mb: 1}}
                    >
                        Sign Up
                    </Button>
                </Grid>
                {errorMsg? <Grid item xs={11} sx={{color:"red", ml:1, mb:1}}>{errorMsg}</Grid> : <></>}
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link href="/login" variant="body2">
                            {"Already have an account? Sign in"}
                        </Link>
                    </Grid>
                </Grid>
            </Grid>
            </Box>
        </Container>
    )
}
export default Register;