import {configureStore} from "@reduxjs/toolkit";
import categoryReducer from "../slices/categorySlice"
import authReducer  from "../slices/authSlice";
import cartItemReducer from "../slices/cartItemSlice";
import productReducer from "../slices/productSlice";
import userReducer from "../slices/userSlice";
import orderReducer from "../slices/orderSlice";

const store = configureStore({
  reducer: {
    category: categoryReducer,
    auth: authReducer,
    cartItem: cartItemReducer,
    order: orderReducer,
    product: productReducer,
    user: userReducer,
  }
})

export default store;