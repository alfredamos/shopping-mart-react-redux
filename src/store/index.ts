import {configureStore} from "@reduxjs/toolkit";
import categoryReducer from "../slices/categorySlice"
import authReducer  from "../slices/authSlice";
import cartItemReducer from "../slices/cartItemSlice";
import productReducer from "../slices/productSlice";

const store = configureStore({
  reducer: {
    category: categoryReducer,
    auth: authReducer,
    cartItem: cartItemReducer,
    product: productReducer
  }
})

export default store;