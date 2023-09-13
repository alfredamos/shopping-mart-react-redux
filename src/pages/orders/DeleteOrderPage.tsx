/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { orderService } from "../../services/order.service";
import OrderDisplayOne from "../../components/displays/orders/OrderDisplayOne";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, getOrderById, getOrderState, orderError } from "../../slices/orderSlice";

export function DeleteOrderPage() {
  const dispatch = useDispatch();
  const {order} = useSelector(getOrderState);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    orderService
      .getOrderById(id!)
      .then((data) => {
        console.log("data: ", data);

        dispatch(getOrderById(data))
      })
      .catch((error) => {
        dispatch(orderError(error.message));
      });
  }, [id]);

  const deleteOrderHandler = (value: boolean) => {
    if (value) {
      orderService
        .deleteOrder(id!)
        .then(( data ) => {
          dispatch(deleteOrder(data))
          navigate("/orders");
        })
        .catch((error) => {
          dispatch(orderError(error.message));
        });
    } else {
      navigate("/orders");
    }
  };

  const backToListHandler = () => {
    navigate("/orders");
  };

  return (
    <div className="row">
      <div className="col col-sm-6 col-md-6 offset-3 mt-5">
        <OrderDisplayOne
          deleteHandler={deleteOrderHandler}
          onBackToList={backToListHandler}
          order={order}
        />
      </div>
    </div>
  );
}
