import { useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { categoryService } from "../../services/category.service";
import CategoryDto from "../../models/categories/category.model";
import CategoryForm from "../../components/forms/categories/CategoryForm";
import { useDispatch, useSelector } from "react-redux";
import { categoryError, getCategoryById, updateCategory } from "../../slices/categorySlice";
import { AppState } from "../../state/app.state";

export function EditCategoryPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const category = useSelector((state: AppState) => state.category.category);

  useEffect(() => {
    categoryService
      .getCategoryById(id!)
      .then((data) => {        
        dispatch(getCategoryById(data));
      })
      .catch((error) => {
        dispatch(categoryError(error));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const categoryEditHandler = (categoryDto: CategoryDto) => {
    categoryService
      .editCategory(categoryDto)
      .then(( data ) => {
        console.log("category-in-category-edit : ", data);

        dispatch(updateCategory(data));
        navigate("/categories");
      })
      .catch((error) => {
        dispatch(categoryError(error));
      });
  };

  const backToListHandler = () => {
    navigate("/categories");
  };

  return (
    <CategoryForm
      initialValue={category}
      onCategoryHandler={categoryEditHandler}
      onBackToList={backToListHandler}
    />
  );
}
