/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet } from "react-router-dom";
import { categoryService } from "../../services/category.service";
import CategoryDto from "../../models/categories/category.model";
import CategoriesTable from "../../components/displays/Categories/CategoriesTable";
import { useDispatch, useSelector } from 'react-redux';
import { categoryError, getAllCategories } from "../../slices/categorySlice";
import { getCategoryState } from "../../slices/categorySlice";
import { useEffect } from "react";

export function ListCategoryPage() {
  const dispatch = useDispatch();
  const {categories, isLoading} = useSelector(getCategoryState);

  useEffect(() => {
    const cats = JSON.parse(
      localStorage.getItem("categories")!
    ) as CategoryDto[];   
    
    if (cats && cats.length > 0) {
      dispatch(getAllCategories(cats));
    } else {
      categoryService
        .getAllCategories()
        .then((data) => {         

          categoryService.updateCategories$(data);
          dispatch(getAllCategories(data));
        })
        .catch((error) => {
          dispatch(categoryError(error));
        });
    }
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6 mt-5">
          {
            
          !isLoading &&<CategoriesTable categories={categories} />
          }
        </div>
        <div className="col-sm-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
