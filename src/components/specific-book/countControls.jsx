import { PropTypes } from "prop-types";
import { useCallback, useEffect, useState } from "react";

import { useCart } from "../../hooks/useCart";
import { CountInput } from "./countInput";

export function CountControls({ book }) {
  const initialPrice = parseFloat(book.price).toFixed(2);
  const [count, setCount] = useState(1);
  const [totalPrice, setTotalPrice] =
    useState(initialPrice);

  const {
    addToCart,
    error,
    message,
    isButtonVisible,
    setError,
  } = useCart();

  useEffect(() => {
    const newTotalPrice = (count * initialPrice).toFixed(2);
    setTotalPrice(newTotalPrice);
  }, [count, initialPrice]);

  const increment = useCallback(() => {
    setCount((prevState) =>
      Math.min(prevState + 1, book.amount)
    );
  }, [book.amount]);

  const decrement = useCallback(() => {
    setCount((prevState) => Math.max(prevState - 1, 1));
  }, []);

  const handleChangeCount = (event) => {
    const value = Number(event.target.value);
    if (value === "" || value <= 0) {
      setCount("");
      setTotalPrice(initialPrice);
    } else if (value > book.amount) {
      setCount(book.amount);
      setTotalPrice(
        (book.amount * initialPrice).toFixed(2)
      );
    } else {
      setCount(value);
      setTotalPrice((value * initialPrice).toFixed(2));
    }
  };

  const handleBlur = () => {
    if (count === "" || count <= 0) {
      setCount(1);
      setTotalPrice(initialPrice);
    }
  };

  const handleAddToCart = () => {
    setError("");
    addToCart(book, count);
  };

  return (
    <>
      <li className="book-cart__item">
        <CountInput
          count={count}
          handleChangeCount={handleChangeCount}
          handleBlur={handleBlur}
          decrement={decrement}
          increment={increment}
          maxAmount={book.amount}
        />
      </li>
      <li className="book-cart__item">
        Total price:
        <span>${totalPrice}</span>
      </li>

      <li className="btn-box">
        {/* {isButtonVisible && (
          <button
            className="btn btn-add"
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
        )} */}

        <button
          className="btn btn-add"
          onClick={handleAddToCart}
        >
          {isButtonVisible ? (
            <>Add to cart</>
          ) : (
            <>
              {message && (
                <p
                  style={{
                    color: "green",
                    wordWrap: "break-word",
                  }}
                >
                  {message}
                </p>
              )}
              {error && (
                <p
                  style={{
                    wordWrap: "break-word",
                    color: "red",
                  }}
                >
                  {error}
                </p>
              )}
            </>
          )}
        </button>
      </li>
    </>
  );
}

CountControls.propTypes = {
  book: PropTypes.object,
};
