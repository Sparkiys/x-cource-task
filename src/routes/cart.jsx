import { Link } from "react-router-dom";
import { EmptyCart } from "../components/empty-cart";
import { FilledCart } from "../components/filled-cart";
import { useCart } from "../hooks/useCart";

export function Cart() {
  const { cart, clearCart } = useCart();
  console.log(cart.length);

  return (
    <>
      <section className="cart container">
        <div className=" cart__box">
          <div className="cart__nav">
            <p>Shopping cart</p>

            <button
              className="btn-clear btn"
              onClick={clearCart}
              disabled={cart.length === 0}
            >
              PURCHASE
            </button>
          </div>
          <div className="cart__decs">
            {cart.length === 0 ? (
              <EmptyCart />
            ) : (
              <FilledCart />
            )}
          </div>

          <div className="cart__link">
            <Link className="btn-link btn" to="/bookList">
              Back to the Booklist
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
