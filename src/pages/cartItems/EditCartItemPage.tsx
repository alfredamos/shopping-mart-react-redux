/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { cartItemService } from "../../services/cartItem.service";
import CartItemDto from "../../models/cartItems/cartItem.model";
import CartItemForm from "../../components/forms/cartItems/CartItemForm";
import { productService } from "../../services/product.service";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, getProductState, productError } from '../../slices/productSlice';
import { cartItemError, getCartItemById, getCartItemState, updateCartItem } from "../../slices/cartItemSlice";

export function EditCartItemPage() { 
  const navigate = useNavigate();
  const { id } = useParams();

  const dispatch = useDispatch();
  const {cartItem} = useSelector(getCartItemState);
  const {products} = useSelector(getProductState);

  useEffect(() => {
    productService
      .getAllProducts()
      .then((data) => {
       
        dispatch(getAllProducts(data))      
      })
      .catch((error) => dispatch(productError(error.message)));
  }, []);

  useEffect(() => {
    cartItemService
      .getCartItemById(id!)
      .then((data) => {
        
        dispatch(getCartItemById(data));
      })
      .catch((error) => {       
        dispatch(cartItemError(error.message));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const cartItemHandler = (cartItemDto: CartItemDto) => {
    cartItemService
      .editCartItem(cartItemDto)
      .then((data) => {
        console.log("cartItem-in-cartItem-edit : ", data);
        
        dispatch(updateCartItem(data));
        navigate("/cart-items");
      })
      .catch((error) => {       
        dispatch(cartItemError(error.message));
      });
  };

  const backToListHandler = () => {
    navigate("/cart-items");
  };

  return (
    <CartItemForm
      products={products}
      initialValue={cartItem}
      onCartItemHandler={cartItemHandler}
      onBackToList={backToListHandler}
    />
  );
}
