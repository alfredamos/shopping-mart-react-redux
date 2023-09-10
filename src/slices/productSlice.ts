import { createSlice } from "@reduxjs/toolkit";
import { ProductAction } from "../actions/product.action";
import { ProductDto } from "../models/products/product.model";
import { AppState } from "../state/app.state";
import { ProductState } from "../state/product.state";

const initialProduct: ProductDto = {
  id: "",
  name: "",
  price: 0,  
  brand: "",
  quantity: 0   
}

const initialState: ProductState = {
  product: initialProduct,
  products: [],
  errorMessage: "",
  isLoading: false,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct(state: ProductState, action: ProductAction) {
      const payload = action.payload as ProductDto;
      state.products.push(payload);
      state.isLoading = false;
      state.errorMessage = "";
    },
    deleteProduct(state: ProductState, action: ProductAction) {
      const payload = action.payload as ProductDto;
      state.products.filter((product) => product.id === payload.id);
      state.isLoading = false;
      state.errorMessage = "";
    },
    getAllProducts(state: ProductState, action: ProductAction) {
      state.products = action.payload as ProductDto[];
      state.isLoading = false;
      state.errorMessage = "";
    },
    getProductById(state: ProductState, action: ProductAction) {
      state.product = action.payload as ProductDto;      
      state.isLoading = false;
      state.errorMessage = "";
    },
    updateProduct(state: ProductState, action: ProductAction) {
      const payload = action.payload as ProductDto;
      const index = state.products.findIndex(
        (product) => product.id === payload.id
      );
      state.products[index] = payload;
      state.isLoading = false;
      state.errorMessage = "";
    },
    productError(state: ProductState, action: ProductAction) {
      const payload = action.payload as string;
      state.isLoading = false;
      state.errorMessage = payload;
    },
  },
});

export const {
  addProduct,
  productError,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} = productSlice.actions;

export default productSlice.reducer;
export const getProductState = (state: AppState) => state.product;
