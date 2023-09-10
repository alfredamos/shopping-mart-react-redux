import {createSlice} from "@reduxjs/toolkit";
import { CategoryAction } from '../actions/category.action';
import { CategoryState } from '../state/category.state';
import CategoryDto from "../models/categories/category.model";
import { AppState } from "../state/app.state";

const initialState: CategoryState = {
  categories: [],
  isLoading: true,
  category: {id: "", name: ""},
  errorMessage: ""
}

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addCategory(state: CategoryState, action: CategoryAction){
      const newCategory = action.payload as CategoryDto; 
      state.categories.push(newCategory);
      state.isLoading = false; 
      state.errorMessage = ""
    },
    deleteCategory(state: CategoryState, action: CategoryAction){
      state.categories.filter(category => category.id === action.payload);
      state.isLoading = false; 
      state.errorMessage = "";
    },
    updateCategory(state: CategoryState, action: CategoryAction){
      const payload = action.payload as CategoryDto;
      const index = state.categories.findIndex(category => category.id === payload.id );
      state.categories[index] = payload;
      state.isLoading = false;
      state.errorMessage = ""; 
    },
    getCategoryById(state: CategoryState, action: CategoryAction){
      state.category = action.payload as CategoryDto;
      state.isLoading = false; 
      state.errorMessage = "";
    },
    getAllCategories(state: CategoryState, action: CategoryAction){
      state.categories = action.payload as CategoryDto[];
      state.isLoading = false; 
      state.errorMessage = "";
    },
    categoryError(state: CategoryState, action: CategoryAction){
      state.errorMessage = action.payload as string;
      state.isLoading = false;             
    }
  }  
});

export const {addCategory, categoryError, deleteCategory, getAllCategories, getCategoryById, updateCategory} = categorySlice.actions;
export default categorySlice.reducer;
export const getCategoryState = (state: AppState) => state.category