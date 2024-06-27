import React, { useState } from "react";
import { PropTypes } from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import "./book.scss";
import { useImage } from "../../hooks/useImage";

export function Book({ book }) {
  const navigate = useNavigate();

  const { imageSrc, handleImageError } = useImage({ book });

  const handleViewClick = () => {
    navigate(`/specificBook/${book.id}`);
  };

  console.log(book);
  return (
    <>
      <li className="book__item">
        <Link to={`/specificBook/${book.id}`}>
          <div className="book-card">
            <div className="book-card__desc">
              <img
                src={imageSrc}
                alt={book.title}
                onError={handleImageError}
                className="book-card__image"
              />
              <h3 className="book-card__title">
                {book.title}
              </h3>
              <p className="book-card__author">
                Author: {book.author}
              </p>
            </div>
            <div className="book-card__info">
              <p className="book-card__price">
                Price: ${book.price}
              </p>
              <button
                onClick={handleViewClick}
                className="view__btn"
              >
                View
              </button>
            </div>
          </div>
        </Link>
      </li>
    </>
  );
}

Book.propTypes = {
  book: PropTypes.object,
};
