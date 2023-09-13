import OrderDto from "../models/orders/order.model";

type Payload = OrderDto[] | OrderDto | string;

export class OrderAction {
  constructor(public type: string, public payload: Payload) {}
}
