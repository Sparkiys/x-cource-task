import { PropTypes } from "prop-types";
import { CountControls } from "./countControls";

export function CartBook({ book }) {
  return (
    <div className="book-cart">
      <ul className="book-cart__list">
        <li className="book-cart__item">
          Price:
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
