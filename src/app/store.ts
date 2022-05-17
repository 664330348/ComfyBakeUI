import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import productReducer from '../features/product/productSlice';
import profileReducer from '../features/profile/profileSlice';
import ordersReducer from '../features/orderHistory/ordersSlice';
import shoppingCartReducer from '../features/shoppingcart/shoppingCartSlice';


export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    profile: profileReducer,
    orders: ordersReducer,
    shoppingItems: shoppingCartReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
