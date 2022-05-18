import { nanoid } from '@reduxjs/toolkit'

//MUI
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import Box from '@mui/material/Box';

//redux
import {useSelector, useDispatch} from 'react-redux';
import { selectShoppingItems, removeItem, decreaseByOne, increaseByOne} from "./shoppingCartSlice";

export default function ShoppingCart (){
    const shoppingList = useSelector(selectShoppingItems);
    const dispatch = useDispatch();

    
    return (
        shoppingList.length>0?
            <Grid sx={{display: 'flex', flexDirection: 'column', alignContent:'center'}} container >
                {shoppingList.filter((item:any)=>item.length === undefined).map((item:any)=>(
                    <Card sx={{ minWidth: 700, display: 'flex', flex:'1', flexDirection: 'column',mt:3,mb:2}} key={nanoid()}>
                        <CardContent sx={{display: 'flex', flexDirection: 'column', alignContent:'center', bgcolor:'#8ca7d4'}}>
                            <Typography  variant="h5" component="div" >
                                {item.bakeName}
                            </Typography>
                            <Card sx={{ minWidth: 600, display: 'inline-flex', flex:'1', flexDirection: 'raw', mt:2}} key={nanoid()}>
                                <CardContent sx={{display: 'flex', flex:'3',}}>
                                    <CardMedia
                                        component="img"
                                        height="194"
                                        src={item.image!}
                                        alt=" "
                                    />
                                </CardContent>
                                <CardContent sx={{display: 'flex', flex:'2',flexDirection: 'column'}}>
                                    <Typography sx={{flex:1}}></Typography>
                                    
                                    <Box sx={{display: 'flex', flex:2, justifyContent:'center'}}>
                                        <Typography variant="h6">
                                        {`$${item.price} / each`}
                                        </Typography>
                                    </Box>
                                    
                                    <Box sx={{display: 'flex', flex:2, justifyContent:'center'}}>
                                        <Typography component="div" sx={{display: 'inline-flex', flexDirection: 'raw'}}>
                                            <IconButton
                                                sx={{ display: { xs: 'none', sm: 'block' } }}
                                                onClick={()=>{dispatch(decreaseByOne(item.bakeId));}}
                                            >
                                                <ChevronLeftIcon/>
                                            </IconButton>

                                            <Typography variant="h6" sx={{pt:1}}>
                                                {item.purchase}
                                            </Typography>

                                            <IconButton
                                                sx={{ display: { xs: 'none', sm: 'block' } }}
                                                onClick={()=>{dispatch(increaseByOne(item.bakeId));}}
                                            >
                                                <ChevronRightIcon/>
                                            </IconButton>
                                        </Typography>
                                    </Box>
                                    
                                    <Box sx={{display: 'inline-flex', flex:2, flexDirection: 'raw'}}>
                                        <Typography variant="h6" sx={{pt:1, flex:2}}>
                                            {`Total: $${Math.round(item.purchase!*item.price!*100)/100}`}
                                        </Typography>

                                        <IconButton
                                                sx={{ display: { xs: 'none', sm: 'block' },flex:1 }}
                                                onClick={()=>{dispatch(removeItem(item.bakeId));}}
                                        >
                                            <RemoveShoppingCartIcon/>
                                        </IconButton>
                                    </Box>
                                    

                                </CardContent>
                            </Card>
                        </CardContent>
                    </Card>
                ))}
            </Grid>
            :
            <Grid sx={{display: 'flex', justifyContent:'center', mt:5}} container >
                <Alert variant="outlined" severity="info" >
                    You have not ordered anything yet.
                </Alert>
            </Grid>
    )
}