import { ProductState } from "../state/product.state";
import { ProductDto } from "../models/products/product.model";

export const initialProductListState = new ProductState();

type Payload = ProductDto[] | ProductDto | string;

export class ProductAction {
  constructor(public type: string, public payload: Payload) {}
}
