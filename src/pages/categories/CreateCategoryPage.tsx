import { useNavigate } from "react-router-dom";
import CategoryForm from "../../components/forms/categories/CategoryForm";
import CategoryDto from "../../models/categories/category.model";
import { categoryService } from "../../services/category.service";
import { useDispatch } from "react-redux";
import { addCategory, categoryError } from "../../slices/categorySlice";

export function CreateCategoryPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const categorySubmitHandler = (categoryDto: CategoryDto) => {
    delete categoryDto.id;
    console.log("NewCategory : ", categoryDto);    
    categoryService
      .createCategory(categoryDto)
      .then((data) => {
        console.log("new User : ", data);       
        dispatch(addCategory(data))
        navigate("/categories");
      })
      .catch((error) => {        
        console.log({error});
               
        dispatch(categoryError(error))
      });
  };

  const backToList = () => {
    navigate("/categories");
  };

  return (
    <CategoryForm
      initialValue={new CategoryDto()}
      onBackToList={backToList}
      onCategoryHandler={categorySubmitHandler}
    />
  );
}
