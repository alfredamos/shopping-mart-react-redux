import CategoryDto from "../models/categories/category.model";

type Payload = CategoryDto[] | CategoryDto | string;

export class CategoryAction {
  constructor(public type: string, public payload: Payload) {}
}
