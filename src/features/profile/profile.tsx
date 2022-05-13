import {useState} from "react";
import defaultPhoto from './defaultPhoto.png';
import { useCookies} from 'react-cookie';
import {updateUserProfile} from "../../remote/user-service";

//MUI
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import TextField from '@mui/material/TextField';
import CancelIcon from '@mui/icons-material/Cancel';

//redux
import {useSelector, useDispatch} from 'react-redux';
import {selectProfile, updateProfile, profileInfor} from './profileSlice';

function Profile (){
    const [errorMsg, setErrorMsg] = useState('');
    const [cookies] = useCookies(["principal"]);
    const userProfile = useSelector(selectProfile);
    const dispatch = useDispatch();
    const [canEditProfile, setCanEditProfile] = useState(true);


    const doneEditingProfile =(event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let newProfileInfo = {
            firstname: data.get("editFirstName"),
            lastname: data.get("editLastName"), 
            email: data.get("editEmail"),
            photo: null
        }
        console.log("newProfileInfo.email",newProfileInfo.email,"das");
        
        updateUserProfile(cookies.principal.token, newProfileInfo).then((res)=>{
            if(res.status===201){
                dispatch(updateProfile(newProfileInfo));
                setCanEditProfile(true);
            }else{
                setErrorMsg(res.data.message);
            }
        })       

    }
    return(
        canEditProfile? 
        <Container maxWidth="sm">
            <Card sx={{ display: 'flex', mt:10, flex:'1'}}>
            <Box >
                {userProfile.photo?
                    <CardMedia
                        component="img"
                        sx={{ width: 200 }}
                        src={userProfile.photo}
                        alt="Live from space album cover"
                    />
                    :
                    <CardMedia
                        component="img"
                        sx={{ width: 200 }}
                        src={defaultPhoto}
                        alt="Live from space album cover"
                    />
                }
            </Box>
            <Box sx={{ display: 'flex', flex:'1', flexDirection: 'column'}}>
                <Box sx={{display: 'flex', flex:'4',flexDirection: 'column',justifyContent:'center', alignItems:'center'}}>
                    <p>{userProfile.firstname} {userProfile.lastname}</p>
                    {userProfile.email?
                        <p>{userProfile.email}</p>
                        :
                        <></>
                    }
                </Box>
                <Box sx={{display: 'flex', flex:'1', justifyContent:'end'}}>
                    <IconButton aria-label="editProfile" onClick={()=>{ setCanEditProfile(false);
                                                                        setErrorMsg('')}}>
                        <EditIcon sx={{ height: 30, width: 30 }} />
                    </IconButton>
                </Box>
            </Box>
            </Card>
        </Container>
        :
        <Container maxWidth="sm">
            <Card sx={{ display: 'flex', mt:10, flex:'1'}}>
            <Box >
                {userProfile.photo?
                    <CardMedia
                        component="img"
                        sx={{ width: 200 }}
                        src={userProfile.photo}
                        alt="Live from space album cover"
                    />
                    :
                    <CardMedia
                        component="img"
                        sx={{ width: 200 }}
                        src={defaultPhoto}
                        alt="Live from space album cover"
                    />
                }
            </Box>
            <Box sx={{ display: 'flex', flex:'1', flexDirection: 'column'}} component="form" noValidate onSubmit={doneEditingProfile}>
                <Box sx={{display: 'inline-flex', flex:'3',justifyContent:'space-around', alignItems:'center'}}>
                    <TextField
                        id="editFirstName"
                        label="FirstName"
                        name="editFirstName"
                        defaultValue={userProfile.firstname}
                        sx={{height: 50, width: 150 }}
                    />
                    <TextField
                        id="editLastName"
                        label="LastName"
                        name="editLastName"
                        defaultValue={userProfile.lastname}
                        sx={{height: 50, width: 150 }}
                    />
                </Box>

                <Box sx={{display: 'flex', flex:'2',justifyContent:'center', alignItems:'center'}}>
                    {userProfile.email?
                        <TextField
                            id="editEmail"
                            label="Email"
                            name="editEmail"
                            defaultValue={userProfile.email}
                            sx={{height: 50, width: 250 }}
                        />:
                        <TextField
                            id="editEmail"
                            label="Email"
                            name="editEmail"
                            sx={{height: 50, width: 250 }}
                        />
                    }
                </Box>

                <Box sx={{display: 'flex', flex:'1', justifyContent:'end'}}>
                    {errorMsg? <p style={{color:"red", marginRight:1}}>{errorMsg}</p> : <></>}
                    <IconButton aria-label="cancelEditProfile" onClick={()=>{setCanEditProfile(true)}}>
                        <CancelIcon sx={{ height: 30, width: 30 }} />
                    </IconButton>
                    <IconButton aria-label="doneEditProfile" type="submit">
                        <CheckCircleOutlineIcon sx={{ height: 30, width: 30 }} />
                    </IconButton>
                </Box>
            </Box>
            </Card>
        </Container>
    )

}

export default Profile;