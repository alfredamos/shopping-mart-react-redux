/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import OrdersTable from "../../components/displays/orders/OrdersTable";
import { orderService } from "../../services/order.service";
import OrderDto from "../../models/orders/order.model";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, getOrderState, orderError } from "../../slices/orderSlice";

export function ListOrderPage() {
  const dispatch = useDispatch();
  const {orders} = useSelector(getOrderState);

  useEffect(() => {
    const orders = JSON.parse(
      localStorage.getItem("orders")!
    ) as OrderDto[];
    if (orders && orders.length > 0) {
      dispatch(getAllOrders(orders));
    } else {
      orderService
        .getAllOrders()
        .then((data) => {
          orderService.updateOrders$(data);
          dispatch(getAllOrders(data));
        })
        .catch((error) => {
          dispatch(orderError(error.message))
        });
    }
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6 mt-5">
          <OrdersTable orders={orders} />
        </div>
        <div className="col-sm-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
