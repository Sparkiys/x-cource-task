import { Link } from "react-router-dom";
import cart from "../images/svg/cart.svg";
import "./emptyCart.scss";

export function EmptyCart() {
  return (
    <>
      <img src={cart} alt="cart" width="200" height="200" />
      <p>Your cart is empty</p>
    </>
  );
}
