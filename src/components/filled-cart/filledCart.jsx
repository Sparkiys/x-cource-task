import { useCart } from "../../hooks/useCart";
import notFoundImage from "../images/imageNotFound.png";
import "./filledCart.scss";

export function FilledCart() {
  const { cart, setCart } = useCart();

  const totalPrice = cart
    .reduce(
      (sum, item) => sum + item.count * item.book.price,
      0
    )
    .toFixed(2);

  const handleDeleteBook = (bookId) => {
    setCart(cart.filter((item) => item.book.id !== bookId));
  };

  return (
    <>
      <ul className="cart-list">
        {cart.map((item) => (
          <li
            className="cart-list__item"
            key={item.book.id}
          >
            <img
              src={item.book.image || notFoundImage}
              alt={item.book.title}
              width="60"
              height="80"
            />
            <div className="item-info">
              <div className="item-info__title">
                <p>{item.book.title}</p>
              </div>

              <div>
                <p>
                  Items : {item.count} x ${item.book.price}
                </p>
              </div>
              <div>
                <p>
                  Total : $
                  {(item.count * item.book.price).toFixed(
                    2
                  )}
                </p>
              </div>
            </div>

            <button
              className="btn-delete"
              onClick={() => handleDeleteBook(item.book.id)}
            >
              X
            </button>
          </li>
        ))}
      </ul>
      <div className="cart-list__price">
        <p>Total price : ${totalPrice}</p>
      </div>
    </>
  );
}
