import CartItemDto from "../models/cartItems/cartItem.model";

type Payload = CartItemDto[] | CartItemDto | string;

export class CartItemAction {
  constructor(public type: string, public payload: Payload) {}
}
