/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "../../components/forms/products/ProductForm";
import { ProductDto } from "../../models/products/product.model";
import { productService } from "../../services/product.service";
import { useDispatch, useSelector } from "react-redux";
import { categoryError, getAllCategories, getCategoryState} from "../../slices/categorySlice";
import { getProductById, getProductState, productError, updateProduct } from "../../slices/productSlice";
import { categoryService } from "../../services/category.service";

export function ProductEditPage() {
 const dispatch = useDispatch();
 const {categories} = useSelector(getCategoryState)
 const {product} = useSelector(getProductState);

  const navigate = useNavigate();
  const { id } = useParams();

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

  useEffect(() => {
    productService.getProductById(id!).then((product) => {
     dispatch(getProductById(product));
    }).catch(error => dispatch(productError(error.message)));
  }, [id]);

  const productSubmitHandler = (productDto: ProductDto) => {
    productService
      .editProduct(productDto)
      .then((product) => {
        console.log("new User : ", product);

       dispatch(updateProduct(product));
        navigate("/list-product");
      })
      .catch((error) => {
        dispatch(productError(error.message))
      });
  };

  const backToList = () => {
    navigate("/list-product");
  };

  return (
    <ProductForm
      initialValue={product}
      categories={categories}
      onBackToList={backToList}
      onProductHandler={productSubmitHandler}
    />
  );
}
