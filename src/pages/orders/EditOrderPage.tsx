/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { orderService } from "../../services/order.service";
import OrderDto from "../../models/orders/order.model";
import OrderForm from "../../components/forms/orders/OrderForm";
import { userService } from "../../services/user.service";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById, getOrderState, orderError, updateOrder } from "../../slices/orderSlice";
import { getAllUsers, getUserState, userError } from "../../slices/userSlice";

export function EditOrderPage() {
 const dispatch = useDispatch();
 const {order} = useSelector(getOrderState);
 const {users} = useSelector(getUserState);

  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    userService.getAllUsers().then((data) => {
      dispatch(getAllUsers(data.users!));
    }).catch(error => dispatch(userError(error.message)));
  }, []);

  
  useEffect(() => {
    orderService.getOrderById(id!)
      .then(data => {
        dispatch(getOrderById(data));

      }).catch(error => dispatch(orderError(error.message)))
  });

  const orderHandler = (orderDto: OrderDto) => {
    orderService
      .editOrder(orderDto)
      .then((data ) => {
        dispatch(updateOrder(data));
        navigate("/orders");
      })
      .catch((error) => {
        dispatch(orderError(error.message));
      });
  };

  const backToListHandler = () => {
    navigate("/orders");
  };

  return (
    <OrderForm
      users={users!}
      initialValue={order}
      onOrderHandler={orderHandler}
      onBackToList={backToListHandler}
    />
  );
}
