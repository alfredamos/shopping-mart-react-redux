/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { orderService } from "../../services/order.service";
import OrderDto from "../../models/orders/order.model";
import OrderForm from "../../components/forms/orders/OrderForm";
import { userService } from "../../services/user.service";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getUserState, userError } from "../../slices/userSlice";
import { addOrder, orderError } from "../../slices/orderSlice";

export function CreateOrderPage() {
 const dispatch = useDispatch();
 const {users} = useSelector(getUserState);

  const navigate = useNavigate();

  useEffect(() => {
    userService.getAllUsers().then((data) => {
      dispatch(getAllUsers(data.users!))
    }).catch(error => dispatch(userError(error.message)));
  }, []);

  const orderHandler = (orderDto: OrderDto) => {
    orderService
      .createOrder(orderDto)
      .then(({ data }) => {
        console.log("order-in-order-edit : ", data);
        dispatch(addOrder(data));
        navigate("/orders");
      })
      .catch((error) => {
        dispatch(orderError(error.message))
      });
  };

  const backToListHandler = () => {
    navigate("/orders");
  };

  return (
    <OrderForm
      users={users!}
      initialValue={new OrderDto()}
      onOrderHandler={orderHandler}
      onBackToList={backToListHandler}
    />
  );
}
