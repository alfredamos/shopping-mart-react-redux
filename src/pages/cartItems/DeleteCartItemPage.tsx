
import { useEffect } from "react";
import { cartItemService } from "../../services/cartItem.service";
import { useNavigate, useParams } from "react-router-dom";
import CartItemDisplayOne from "../../components/displays/cartItems/CartItemDisplayOne";
import { useDispatch, useSelector } from "react-redux";
import { cartItemError, deleteCartItem, getCartItemById, getCartItemState } from "../../slices/cartItemSlice";

export function DeleteCartItemPage() {
  const dispatch = useDispatch();
  const {cartItem} = useSelector(getCartItemState);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    cartItemService
      .getCartItemById(id!)
      .then((data) => {
        console.log("cartItem-in-cartItem-detail : ", data);

        dispatch(getCartItemById(data));
      })
      .catch((error) => {
        dispatch(cartItemError(error.message));
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const backToListHandler = () => {
    navigate(-1);
  };

  const cartItemDeleteHandler = (value: boolean) => {
    if (value) {
      cartItemService
        .deleteCartItem(id!)
        .then(() => {
          dispatch(deleteCartItem(id!))
          navigate("/cartItems");
        })
        .catch((error) => dispatch(cartItemError(error.message)));
    } else {
      navigate(-1);
    }
  };
  return (
    <CartItemDisplayOne
      deleteHandler={cartItemDeleteHandler}
      cartItem={cartItem}
      onBackToList={backToListHandler}
    />
  );
}

