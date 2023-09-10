/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import CartItemsTable from "../../components/displays/cartItems/CartItemsTable";
import { cartItemService } from "../../services/cartItem.service";
import CartItemDto from "../../models/cartItems/cartItem.model";
import { useDispatch, useSelector } from "react-redux";
import { cartItemError, getAllCartItems, getCartItemState } from "../../slices/cartItemSlice";

export function ListCartItemPage() {  
  const dispatch = useDispatch();
  const {cartItems} = useSelector(getCartItemState);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")!) as CartItemDto[];
    if (cartItems && cartItems.length > 0) {     
      dispatch(getAllCartItems(cartItems));
    } else {
      cartItemService
        .getAllCartItems()
        .then((data) => {
          cartItemService.updateCartItems$(data);
          dispatch(getAllCartItems(data));
        })
        .catch((error) => {
          dispatch(cartItemError(error.message));
          
        });
    }
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6 mt-5">
          <CartItemsTable cartItems={cartItems} />
        </div>
        <div className="col-sm-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
