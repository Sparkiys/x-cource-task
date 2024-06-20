import { PropTypes } from "prop-types";
import { CountControls } from "./countControls";

export function CartBook({ book }) {
  /* console.log("CartBook rendered");
  const initialPrice = parseFloat(book.price).toFixed(2);
  const [count, setCount] = useState(1);
  const [totalPrice, setTotalPrice] =
    useState(initialPrice);

  const { addToCart } = useCart();

  useEffect(() => {
    const newTotalPrice = (count * initialPrice).toFixed(2);
    setTotalPrice(newTotalPrice);
  }, [count, initialPrice]);

  const increment = () => {
    setCount((prevState) =>
      Math.min(prevState + 1, book.amount)
    );
  };

  const decrement = () => {
    setCount((prevState) => Math.max(prevState - 1, 1));
  };

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
    addToCart(book, count);
  }; */

  return (
    <div className="book-cart">
      <ul className="book-cart__list">
        <li className="book-cart__item">
          Price
          <span>${book.price}</span>
        </li>
        <CountControls book={book} />
      </ul>
    </div>
  );
}

CartBook.propTypes = {
  book: PropTypes.object,
};
