import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { productService } from "../../services/product.service";
import ProductsTable from "../../components/displays/products/ProductsTable";
import { ProductDto } from "../../models/products/product.model";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, getProductState, productError } from "../../slices/productSlice";

export function ListProductPage() {  
  const dispatch = useDispatch();
  const {products} = useSelector(getProductState);

  useEffect(() => {
    const products = JSON.parse(
      localStorage.getItem("products")!
    ) as ProductDto[];
    if (products && products.length > 0) {
      dispatch(getAllProducts(products));
    } else {
      productService
        .getAllProducts()
        .then((data) => {
          productService.updateProducts$(data);
          dispatch(getAllProducts(data));
        })
        .catch((error) => {
          dispatch(productError(error.message));
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6 mt-5">
          <ProductsTable products={products} />
        </div>
        <div className="col-sm-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
