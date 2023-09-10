import { CartItemState } from "./cartItem.state";
import { CategoryState } from "./category.state"
import { ProductState } from "./product.state";
import { StateAuth } from "./state.auth";
import { UserState } from "./user.state";

export class AppState{
  category!: CategoryState;
  auth!: StateAuth;
  cartItem!: CartItemState;
  product!: ProductState;
  user!: UserState;
}