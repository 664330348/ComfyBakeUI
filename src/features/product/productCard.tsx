import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

//redux
import { useDispatch } from 'react-redux';
import { productInfor} from './productSlice';
import { addItem, shoppingItemState } from '../shoppingcart/shoppingCartSlice';

const ExpandMore = styled((props:any) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ProductCard(props:productInfor) {
  const [expanded, setExpanded] = React.useState(false);
  const dispatch = useDispatch();

  const handleAddItem =()=>{
    let item:shoppingItemState={
      bakeId: props.bakeId,
      bakeName: props.bakeName,
      image: props.image,
      price: props.price,
      quantity: props.quantity,
      purchase: 1,
      userProfileId: props.userProfile.userProfileId
    };
    dispatch(addItem(item));
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardHeader
        title={props.bakeName}
      />
      <CardMedia
        component="img"
        height="194"
        src={props.image}
        alt=" "
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.described}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <MonetizationOnIcon sx={{ mr:0.2}}/>{props.price}
        <p style={{margin:"0 25px"}}>{`${props.quantity} left `}</p>
        <IconButton 
          aria-label="add to shoppingCart"
          onClick={handleAddItem}
        >
          <AddShoppingCartIcon/>
        </IconButton>

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Recipe:</Typography>
          <Typography paragraph>
            {props.recipe}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
