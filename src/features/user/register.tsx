import React from "react";
import { register } from "../../remote/user-service";

//MaterialUI
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

function Register (){

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
                console.log(res); 
            });
        }else{
            console.log(data);
        }
    }

    return(
        <Container maxWidth="xs" >
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

                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link href="#" variant="body2">
                        Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
            </Grid>
            </Box>
        </Container>
    )
}
export default Register;