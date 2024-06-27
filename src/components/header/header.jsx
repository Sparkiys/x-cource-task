import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import card from "../images/svg/cart.svg";
import { useLogin } from "../../hooks";
import { useCart } from "../../hooks/useCart";
import { ReactComponent as Menu } from "../images/svg/menu.svg";
import { ReactComponent as Cross } from "../images/svg/cross.svg";

export function Header() {
  const { username, isLogin, handleSignOut } = useLogin();
  const { cart } = useCart();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const openBurgerMenuHandler = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  };

  const closeBurgerMenuHandler = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  };

  const totalItems = cart.reduce(
    (sum, item) => sum + item.count,
    0
  );

  useEffect(() => {
    if (!isLogin) {
      navigate("/");
    }
  }, [isLogin, navigate]);

  return (
    <header className="header container">
      <div className="header__container">
        <Link className="brand" to="/booklist">
          X-course_Task/Yevhenii Pavlenko
        </Link>

        {username ? (
          <>
            <div
              className={`nav ${!isOpen ? "active" : ""}`}
            >
              <ul className="nav__list">
                <li className="nav__link">
                  <Link
                    to="/cart"
                    onClick={closeBurgerMenuHandler}
                  >
                    <img src={card} width="42" alt="cart" />

                    {totalItems === 0 ? (
                      ""
                    ) : (
                      <span>{totalItems}</span>
                    )}
                  </Link>
                </li>
                <li>
                  <button
                    className="btn sgo-btn"
                    onClick={() => {
                      handleSignOut();
                      closeBurgerMenuHandler();
                    }}
                  >
                    Sing-Out
                  </button>
                </li>
                <li>
                  <Link
                    to="/"
                    className="user-avatar"
                    onClick={closeBurgerMenuHandler}
                  >
                    {username}
                  </Link>
                </li>
              </ul>
            </div>
            <button
              className="header__menu-btn"
              onClick={openBurgerMenuHandler}
            >
              {" "}
              {isOpen ? <Cross /> : <Menu />}
            </button>
          </>
        ) : (
          ""
        )}
        {/* <button
          className="burger-toggle"
          onClick={openBurgerMenuHandler}
        >
          {isOpen ? "Close" : "Menu"}
        </button> */}
      </div>
    </header>
  );
}
