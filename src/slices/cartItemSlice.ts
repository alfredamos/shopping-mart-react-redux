import { createSlice } from "@reduxjs/toolkit";
import CartItemDto from "../models/cartItems/cartItem.model";
import { CartItemState } from "../state/cartItem.state";
import { CartItemAction } from "../actions/cartItem";
import { AppState } from "../state/app.state";

const initialCartItem: CartItemDto = {
   productId:  "",
  price: 0,
  quantity: 0
}

const initialState: CartItemState = {
  cartItem: initialCartItem,
  cartItems: [],
  errorMessage: "",
  isLoading: false,
};

const cartItemSlice = createSlice({
  name: "cartItem",
  initialState,
  reducers: {
    addCartItem(state: CartItemState, action: CartItemAction) {
      const payload = action.payload as CartItemDto;
      state.cartItems.push(payload);
      state.isLoading = false;
      state.errorMessage = "";
    },
    deleteCartItem(state: CartItemState, action: CartItemAction) {
      const payload = action.payload as CartItemDto;
      state.cartItems.filter((cartItem) => cartItem.id === payload.id);
      state.isLoading = false;
      state.errorMessage = "";
    },
    getAllCartItems(state: CartItemState, action: CartItemAction) {
      state.cartItems = action.payload as CartItemDto[];
      state.isLoading = false;
      state.errorMessage = "";
    },
    getCartItemById(state: CartItemState, action: CartItemAction) {
      const payload = action.payload as CartItemDto;
      state.cartItem = payload
      state.isLoading = false;
      state.errorMessage = "";
    },
    updateCartItem(state: CartItemState, action: CartItemAction) {
      const payload = action.payload as CartItemDto;
      const index = state.cartItems.findIndex(
        (cartItem) => cartItem.id === payload.id
      );
      state.cartItems[index] = payload;
      state.isLoading = false;
      state.errorMessage = "";
    },
    cartItemError(state: CartItemState, action: CartItemAction) {
      const payload = action.payload as string;
      state.isLoading = false;
      state.errorMessage = payload;
    },
  },
});

export const {
  addCartItem,
  cartItemError,
  deleteCartItem,
  getAllCartItems,
  getCartItemById,
  updateCartItem,
} = cartItemSlice.actions;

export default cartItemSlice.reducer;
export const getCartItemState = (state: AppState) => state.cartItem;
