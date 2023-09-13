/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { productService } from "../../services/product.service";
import ProductDisplay from "../../components/displays/products/ProductDisplay";
import { Link, useNavigate } from "react-router-dom";
import { ProductDto } from "../../models/products/product.model";
import { Role } from "../../models/auth/user-type.model";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, getProductState } from "../../slices/productSlice";
import { getAuthState } from "../../slices/authSlice";

export function ProductListPage() {
  const dispatch = useDispatch();
  const { products } = useSelector(getProductState);

  const navigate = useNavigate();

  const { role } = useSelector(getAuthState);
  const isAdmin = role === Role.Admin;

  useEffect(function () {
    const products = JSON.parse(
      localStorage.getItem("products")!
    ) as ProductDto[];

    if (products && products.length) {
      console.log("In useEffect at point 1, products : ", products);
      dispatch(getAllProducts(products));
    } else {
      productService.getAllProducts().then((products) => {
        dispatch(getAllProducts(products));
      });
    }
  }, []);

  const backToList = () => {
    navigate("/");
  };

  const addToCart = (id: string) => {
    navigate(`/products/detail/${id}`);
  };

  return (
    <div className="container">
      {isAdmin && (
        <div className="row mt-5">
          <div className="col-6">
            <h4 className="d-flex justify-content-start align-content-center">
              Create new Product &#8594;
            </h4>
          </div>
          <div className="col-6 d-flex justify-content-end align-content-center">
            <Link
              to="/list-product/create"
              className="btn btn-outline-secondary btn-lg w-50 me-0 fw-bold"
            >
              Create
            </Link>
          </div>
        </div>
      )}

      <div className="row mt-5">
        {products?.map((product) => (
          <div className="col col-sm-2 col-md-3 col-lg-4 m-1" key={product.id}>
            <ProductDisplay
              product={product}
              onBackToList={backToList}
              addToCart={addToCart}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
