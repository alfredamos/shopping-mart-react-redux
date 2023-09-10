import { categoryService } from "../../services/category.service";
import { useNavigate, useParams } from "react-router-dom";
import CategoryDisplayOne from "../../components/displays/Categories/CategoryDisplayOne";
import { useDispatch, useSelector } from "react-redux";
import { categoryError, getCategoryById } from "../../slices/categorySlice";
import { useEffect } from "react";
import { AppState } from "../../state/app.state";

export function DetailCategoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const category = useSelector((state: AppState) => state.category.category);

  useEffect(() => {
    categoryService
      .getCategoryById(id!)
      .then((data) => {
        dispatch(getCategoryById(data))       
      })
      .catch((error) => {
        dispatch(categoryError(error))
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const backToListHandler = () => {
    navigate(-1);
  };

  const categoryDeleteHandler = (value: boolean) => {
    if (value) {
      categoryService
        .deleteCategory(id!)
        .then(() => {
          navigate("/categories");
        })
        .catch((error) => console.log(error));
    } else {
      navigate(-1);
    }
  };
  return (
    <CategoryDisplayOne
      deleteHandler={categoryDeleteHandler}
      category={category}
      onBackToList={backToListHandler}
    />
  );
}
