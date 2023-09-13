/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import ProductForm from "../../components/forms/products/ProductForm";
import { ProductDto } from "../../models/products/product.model";
import { useNavigate } from "react-router-dom";
import { productService } from "../../services/product.service";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, productError } from "../../slices/productSlice";
import { categoryService } from "../../services/category.service";
import { categoryError, getAllCategories, getCategoryState } from "../../slices/categorySlice";

export function ProductCreatePage() {  
  const dispatch = useDispatch();
  const {categories} = useSelector(getCategoryState)

  const navigate = useNavigate();

  useEffect(() => {
    categoryService
      .getAllCategories()
      .then((data) => {
        dispatch(getAllCategories(data));
      })
      .catch((error) => {
        dispatch(categoryError(error.message));
      });
  }, []);

  const productSubmitHandler = (productDto: ProductDto) => {
    delete productDto.id; 
    productService
      .createProduct(productDto)
      .then((data) => {
        console.log("new User : ", data);

        dispatch(addProduct(data));
        navigate("/list-product");
      })
      .catch((error) => {
        dispatch(productError(error.message));
      });
  };

  const backToList = () => {
    navigate("/list-product");
  };

  return (
    <ProductForm
      initialValue={new ProductDto()}
      categories={categories}
      onBackToList={backToList}
      onProductHandler={productSubmitHandler}
    />
  );
}
