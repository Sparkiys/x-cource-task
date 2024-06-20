import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import card from "../images/svg/cart.svg";
import { useLogin } from "../../hooks";
import { useCart } from "../../hooks/useCart";

export function Header() {
  const { username, isLogin, handleSignOut } = useLogin();
  const { cart } = useCart();
  const navigate = useNavigate();

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
    <header className="header">
      <div className="header-container container">
        <Link className="brand" to="/booklist">
          X-course_Task/Yevhenii Pavlenko
        </Link>

        {username ? (
          <nav className="nav">
            <ul className="nav-list">
              <li>
                <Link className="nav-link" to="/cart">
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
                  onClick={handleSignOut}
                >
                  Sing-Out
                </button>
              </li>
              <li>
                <Link to="/" className="user-avatar">
                  {username}
                </Link>
              </li>
            </ul>
          </nav>
        ) : (
          ""
        )}
      </div>
    </header>
  );
}
