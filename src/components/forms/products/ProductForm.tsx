import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ProductDto } from "../../../models/products/product.model";
import CategoryDto from "../../../models/categories/category.model";

interface Props {
  initialValue: ProductDto;
  categories: CategoryDto[];
  onProductHandler: (productDto: ProductDto) => void;
  onBackToList: () => void;
}

const schema = yup.object().shape({
  id: yup.string().optional(),
  name: yup.string().required("Name is required!"),
  brand: yup.string().required("Brand is required!"),
  description: yup.string().optional(),
  productImage: yup.string().optional(),
  categoryId: yup.string().optional(),
  price: yup.number().required("Price is required!"),
  quantity: yup.number().required("Quantity is required!"),
  rating: yup.number().optional(),
});

const ProductForm = ({ onProductHandler, onBackToList, initialValue, categories }: Props) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<ProductDto>({
    values: { ...initialValue },
    resolver: yupResolver<ProductDto>(schema),
  });

  return (
    <div className="row mt-5">
      <div className="col col-sm-8 col-md-8 offset-2">
        <div className="card">
          <form
            onSubmit={handleSubmit((data: ProductDto) => {
              onProductHandler({ ...data });
              reset();
            })}
          >
            <div className="card-header bg-primary text-white">
              <h4 className="text-center">Product Form</h4>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  {...register("name")}
                  type="text"
                  className="form-control"
                />
                <p className="has-validation text-danger">
                  {errors.name?.message}
                </p>
              </div>
              <div className="mb-3">
                <label htmlFor="brand" className="form-label">
                  Brand
                </label>
                <input
                  {...register("brand")}
                  type="text"
                  className="form-control"
                />
                <p className="has-validation text-danger">
                  {errors.brand?.message}
                </p>
              </div>
              <div className="mb-3">
                <label htmlFor="productImage" className="form-label">
                  Image
                </label>
                <input
                  {...register("productImage")}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  {...register("description")}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Price
                </label>
                <input
                  {...register("price")}
                  type="number"
                  className="form-control"
                />
                <p className="has-validation text-danger">
                  {errors.price?.message}
                </p>
              </div>
              <div className="mb-3">
                <label htmlFor="quantity" className="form-label">
                  Quantity
                </label>
                <input
                  {...register("quantity")}
                  type="number"
                  className="form-control"
                />
                <p className="has-validation text-danger">
                  {errors.quantity?.message}
                </p>
              </div>
              <div className="mb-3">
                <label htmlFor="categoryId" className="form-label">
                  Category
                </label>
                <select {...register("categoryId")} className="form-select">
                  <option>Please select the category</option>
                  {categories.map((category) => (
                    <option
                      id={category.id}
                      value={category.id}
                      key={category.id}
                    >
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="card-footer">
              <button
                type="submit"
                className="btn btn-outline-primary form-control fw-bold"
              >
                Submit
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary form-control fw-bold"
                onClick={onBackToList}
              >
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm