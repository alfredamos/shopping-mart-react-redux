/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { ProductDisplayOne } from "../../components/displays/products/ProductDisplayOne";
import { productService } from "../../services/product.service";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductState,
  getProductById,
  productError,
  deleteProduct,
} from "../../slices/productSlice";

export function ProductDetailPage() {
  const dispatch = useDispatch();
  const { product } = useSelector(getProductState);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    productService
      .getProductById(id!)
      .then((data) => {
        console.log("data: ", data);

        dispatch(getProductById(data));
      })
      .catch((error) => {
        dispatch(productError(error.message));
      });
  }, [id]);

  const deleteProductHandler = (value: boolean) => {
    if (value) {
      productService
        .deleteProduct(id!)
        .then(({ data }) => {
          dispatch(deleteProduct(data));
          navigate("/products");
        })
        .catch((error) => {
          dispatch(productError(error.message));
        });
    } else {
      navigate("/products");
    }
  };

  const backToListHandler = () => {
    navigate("/products");
  };

  return (
    <div className="row">
      <div className="col col-sm-6 col-md-6 offset-3 mt-5">
        <ProductDisplayOne
          deleteHandler={deleteProductHandler}
          onBackToList={backToListHandler}
          product={product}
        />
      </div>
    </div>
  );
}
