/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { ProductDisplayOne } from "../../components/displays/products/ProductDisplayOne";
import { productService } from "../../services/product.service";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryById } from "../../slices/categorySlice";
import { deleteProduct, productError, getProductState } from '../../slices/productSlice';

export function DetailProductPage() {
  const dispatch = useDispatch();
  const {product} = useSelector(getProductState);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    productService
      .getProductById(id!)
      .then((data) => {
        console.log("data: ", data);

        dispatch(getCategoryById(data))
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
          dispatch(deleteProduct(data))
          navigate("/list-product");
        })
        .catch((error) => {
          dispatch(productError(error.message));
        });
    } else {
      navigate("/list-product");
    }
  };

  const backToListHandler = () => {
    navigate("/list-product");
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
