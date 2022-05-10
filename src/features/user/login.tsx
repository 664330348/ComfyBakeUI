import { login } from "../../remote/user-service";
import { useCookies} from 'react-cookie';

//MaterialUI
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

function Login (){
    const [cookies, setCookie] = useCookies(["principal"]);

    const handleLogin =(event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if(data.get('loginUsername') && data.get('loginPassword')){
            let loginInfo={
                username:data.get('loginUsername'),
                password:data.get('loginPassword')
            }
            login(loginInfo).then((res)=>{
                console.log(res); 
                if (res.status===201){
                    setCookie("principal", {token:res.headers["authorization"]});
                }
            });
        }else{
            console.log(data);
        }
    }

    return(
        <Container maxWidth="xs" sx={{marginTop: 8}}>
            <h3>Login page</h3>
            <Box component="form" noValidate onSubmit={handleLogin} 
            >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    id="loginUsername"
                    label="Username"
                    name="loginUsername"
                    autoFocus
                    />
                </Grid>
            
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    name="loginPassword"
                    label="Password"
                    type="password"
                    id="loginPassword"
                    />
                </Grid>

                <Grid item xs={12}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 1, mb: 1}}
                    >
                       Login
                    </Button>
                </Grid>

                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link href="/register" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </Grid>
            </Box>
        </Container>
    )
}
export default Login;