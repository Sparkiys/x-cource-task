import { PropTypes } from "prop-types";
import plus from "../images/svg/plus.svg";
import minus from "../images/svg/minus.svg";
export function CountInput({
  count,
  handleChangeCount,
  handleBlur,
  decrement,
  increment,
  maxAmount,
}) {
  return (
    <div className="book-cart__count">
      <button
        type="button"
        className="btn-count minus"
        onClick={decrement}
        disabled={count === 1}
      >
        <img src={minus} alt="minus" />
      </button>
      <input
        type="number"
        name="count"
        onBlur={handleBlur}
        value={count}
        onChange={handleChangeCount}
      />
      <button
        type="button"
        className="btn-count plus"
        onClick={increment}
        disabled={count === maxAmount}
      >
        <img src={plus} alt="plus" />
      </button>
    </div>
  );
}

CountInput.propTypes = {
  count: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  handleChangeCount: PropTypes.func,
  handleBlur: PropTypes.func,
  decrement: PropTypes.func,
  increment: PropTypes.func,
  maxAmount: PropTypes.number,
};
