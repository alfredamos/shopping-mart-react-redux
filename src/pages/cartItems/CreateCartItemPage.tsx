/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { cartItemService } from "../../services/cartItem.service";
import CartItemDto from "../../models/cartItems/cartItem.model";
import CartItemForm from "../../components/forms/cartItems/CartItemForm";
import { productService } from "../../services/product.service";
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts, getProductState, productError } from '../../slices/productSlice';
import { addCartItem, cartItemError } from "../../slices/cartItemSlice";

export function CreateCartItemPage() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const {products } = useSelector(getProductState)  

  useEffect(() => {
    productService.getAllProducts().then((products) => {     
      dispatch(getAllProducts(products));    
    }).catch(error => dispatch(productError(error.message)));
  }, []);

  const cartItemHandler = (cartItemDto: CartItemDto) => {
    cartItemService
      .createCartItem(cartItemDto)
      .then((data ) => {
        console.log("cartItem-in-cartItem-edit : ", data);
        
        dispatch(addCartItem(data))
        navigate("/cart-items");
      })
      .catch((error) => {       
        dispatch(cartItemError(error.message))
      });
  };

  const backToListHandler = () => {
    navigate("/cart-items");
  };

  return (
    <CartItemForm
      products={products}
      initialValue={new CartItemDto()}
      onCartItemHandler={cartItemHandler}
      onBackToList={backToListHandler}
    />
  );
}
