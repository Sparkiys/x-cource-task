import React from "react";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import notFoundImage from "../images/imageNotFound.png";
import "./book.scss";

export function Book({ book }) {
  console.log(book);
  return (
    <li className="book__item">
      <div className="book__card">
        <div className="book__desc">
          <img
            src={book.image || notFoundImage}
            alt={book.title}
            className="book__image"
          />
          <h3 className="book__title">{book.title}</h3>
          <p className="book__author">
            Author: {book.author}
          </p>
        </div>
        <div className="book__info">
          <p className="book__price">
            Price: ${book.price}
          </p>
          <Link
            to={`/specificBook/${book.id}`}
            className="view__btn"
          >
            View
          </Link>
        </div>
      </div>
    </li>
  );
}

Book.propTypes = {
  book: PropTypes.object,
};
