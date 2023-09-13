import { CartItemState } from "./cartItem.state";
import { CategoryState } from "./category.state"
import { OrderState } from "./order.state";
import { ProductState } from "./product.state";
import { StateAuth } from "./state.auth";
import { UserState } from "./user.state";

export class AppState{
  category!: CategoryState;
  auth!: StateAuth;
  cartItem!: CartItemState;
  order!: OrderState;
  product!: ProductState;
  user!: UserState;
}