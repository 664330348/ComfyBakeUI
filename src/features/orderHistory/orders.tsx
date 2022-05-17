import { nanoid } from '@reduxjs/toolkit'

//MUI
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

//redux
import {useSelector} from 'react-redux';
import { selectOrderHistory} from "./ordersSlice";

export default function Orders (){
    const orders = useSelector(selectOrderHistory);

    const eachOrder = orders.map(order=>(
        <Card sx={{ minWidth: 700, display: 'flex', flex:'1', flexDirection: 'column',mt:3,mb:2}} key={nanoid()}>
            <CardContent sx={{display:'flex', bgcolor:'#a7b8d4'}}>
                <Typography  variant="h5" component="div" sx={{flex:3}}>
                    {order.completedTime!.toString()}
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{flex:1}}>
                    Total: ${order.totalCost}
                </Typography>
            </CardContent>

            <CardContent sx={{display: 'flex', flexDirection: 'column', alignContent:'center', bgcolor:'#8ca7d4'}}>
            {order.orderItemResponses!.map(item=>(
                <Card sx={{ minWidth: 600, display: 'inline-flex', flex:'1', flexDirection: 'raw', mt:2}} key={nanoid()}>
                    <CardContent sx={{display: 'flex', flex:'3',}}>
                        <CardMedia
                            component="img"
                            height="194"
                            src={item.itemImage!}
                            alt=" "
                        />
                    </CardContent>
                    <CardContent sx={{display: 'flex', flex:'2',flexDirection: 'column', alignContent:'center'}}>
                        <Typography variant="h6" sx={{flex:2}}>
                            {item.itemName}
                        </Typography>

                        <Typography variant="h6" sx={{flex:1}}>
                            {`$${item.itemPrice} / each`}
                        </Typography>

                        <Typography variant="h6" sx={{flex:1}}>
                            {`Spend: $${Math.round(item.itemPrice!*item.quantity!*100)/100} => ${item.quantity}`}
                        </Typography>

                    </CardContent>
                </Card>
            ))}
            </CardContent>
        </Card> 
    ))

    return (
        orders.length>0?
            <Grid sx={{display: 'flex', flexDirection: 'column', alignContent:'center'}} container >
                {eachOrder}
            </Grid>
            :
            <Grid sx={{display: 'flex', justifyContent:'center', mt:5}} container >
                <Alert variant="outlined" severity="info" >
                    You have not ordered anything yet.
                </Alert>
            </Grid>
            
        
    )
}