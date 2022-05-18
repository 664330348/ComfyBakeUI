import React, {useState, useEffect} from "react";
import { useCookies} from 'react-cookie';
import { useNavigate, Outlet } from "react-router-dom";

//MUI
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Badge from '@mui/material/Badge';

//redux
import {useSelector, useDispatch} from 'react-redux';
import {selectUser, updateUserInfor, clearUserInfor} from './user/userSlice';
import {selectProducts, updateProducts, clearProducts} from './product/productSlice';
import {selectProfile, updateProfile, clearProfile} from "./profile/profileSlice";
import {updateOrderHistory, clearOrderHistory} from "./orderHistory/ordersSlice";
import { selectShoppingItems} from "./shoppingcart/shoppingCartSlice";

//axios
import {getAllBakedGoods, getOrderHistory} from "../remote/product-sevice";
import {authenticate, getUserProfile} from "../remote/user-service";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));


function Navbar(){
  const [cookies, setCookie, removeCookie] = useCookies(["principal"]);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector(selectUser);
  const products = useSelector(selectProducts);
  const userProfile = useSelector(selectProfile);
  const shoppingItems = useSelector(selectShoppingItems);

  useEffect(()=>{
    if(!cookies.principal){
        navigate('login');
    }else{
      if (!currentUser.token || !currentUser.role){
        authenticate(cookies.principal.token).then((res)=>{                
            if(res.status===200){
                dispatch(updateUserInfor({token:cookies.principal.token,role:res.data.role}));
            }
        })
      }
      if(products.length===0){
        getAllBakedGoods(cookies.principal.token).then((res)=>{
          if(res.status===200){
            dispatch(updateProducts(res.data.AllBakedGoods));
          }
        });
      }
      if(!userProfile.firstname || !userProfile.lastname){
        getUserProfile(cookies.principal.token).then((res)=>{
          if(res.status===200){
            dispatch(updateProfile(res.data.profileResponse));
          }
        });
      }
      getOrderHistory(cookies.principal.token).then((res)=>{
        if(res.status===200){          
          dispatch(updateOrderHistory(res.data.OrderHistoryResponses));
        }
      })
    } 
  },[]);

  const handleProfileMenuOpen = (event:any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout =()=>{
    removeCookie("principal");
    dispatch(clearUserInfor());
    dispatch(clearOrderHistory());
    dispatch(clearProfile());
    dispatch(clearProducts());
    navigate("/login");
  }

  const jumpToProfile =()=>{
    setAnchorEl(null);
    navigate("/profile");

  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={jumpToProfile}>Profile</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            sx={{ display: { xs: 'none', sm: 'block' } }}
            onClick={()=>{navigate('/')}}
          >
            ComfyBake
          </IconButton>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />

          <Button color="inherit" onClick={()=>{navigate("/orders");}}>Orders</Button>

          <Box sx={{ display: { xs: 'flex', md: 'flex' }, mr:1 }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
              onClick={()=>{navigate("/shoppingCart");}}
            >
              <StyledBadge badgeContent={shoppingItems.length/2} color="secondary">
                <ShoppingCartIcon />
              </StyledBadge>
            </IconButton>
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
    <Outlet />
    </>
  );
}
export default Navbar;