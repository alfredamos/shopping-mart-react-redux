import { createSlice } from "@reduxjs/toolkit";
import { OrderAction } from "../actions/order.action";
import OrderDto from "../models/orders/order.model";
import { AppState } from "../state/app.state";
import { OrderState } from "../state/order.state";
import { Status } from "../models/enums/status.enum";

const initialOrder: OrderDto = {
   status: Status.Pending,
}

const initialState: OrderState = {
  order: initialOrder,
  orders: [],
  errorMessage: "",
  isLoading: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder(state: OrderState, action: OrderAction) {
      const payload = action.payload as OrderDto;
      state.orders.push(payload);
      state.isLoading = false;
      state.errorMessage = "";
    },
    deleteOrder(state: OrderState, action: OrderAction) {
      const payload = action.payload as OrderDto;
      state.orders.filter((order) => order.id === payload.id);
      state.isLoading = false;
      state.errorMessage = "";
    },
    getAllOrders(state: OrderState, action: OrderAction) {
      state.orders = action.payload as OrderDto[];
      state.isLoading = false;
      state.errorMessage = "";
    },
    getOrderById(state: OrderState, action: OrderAction) {
      state.order = action.payload as OrderDto;
      state.isLoading = false;
      state.errorMessage = "";
    },
    updateOrder(state: OrderState, action: OrderAction) {
      const payload = action.payload as OrderDto;
      const index = state.orders.findIndex(
        (order) => order.id === payload.id
      );
      state.orders[index] = payload;
      state.isLoading = false;
      state.errorMessage = "";
    },
    orderError(state: OrderState, action: OrderAction) {
      const payload = action.payload as string;
      state.isLoading = false;
      state.errorMessage = payload;
    },
  },
});

export const {
  addOrder,
  orderError,
  deleteOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
export const getOrderState = (state: AppState) => state.order;
