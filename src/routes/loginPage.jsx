import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import avatar from "../components/images/avatar.png";
import { useLogin } from "../hooks";

export function LoginPage() {
  const { username, handleSignIn, isLogin } = useLogin();
  const [localUsername, setLocalUsername] = useState("");

  // Отримуємо об'єкт історії
  const navigate = useNavigate();

  // Обробник події натискання на кнопку
  const handleSignInClick = (event) => {
    event.preventDefault();

    // Виконуємо логіку логінування, наприклад, зберігаємо ім'я користувача в localStorage
    handleSignIn(localUsername);

    // Переадресовуємо користувача на головну сторінку
    navigate("/bookList");
  };

  // Обробник зміни значення поля введення
  const handleChange = (event) => {
    setLocalUsername(event.target.value);
  };

  return (
    <section className="sign-in container">
      <div className="form-box ">
        <img className="form-img" src={avatar} alt="user" />
        <form className="form" action="/">
          <label className="username-label" htmlFor="name">
            Username:
          </label>

          {isLogin ? (
            <p>{username}</p>
          ) : (
            <>
              {" "}
              <input
                className="username-input"
                type="text"
                name="name"
                id="name"
                placeholder="Enter your name"
                required
                value={isLogin ? username : localUsername}
                onChange={handleChange}
              />
              <button
                onClick={handleSignInClick}
                className="btn sgi-btn"
                disabled={
                  localUsername.length < 4 ||
                  localUsername.length > 16
                }
              >
                Sign-in
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}

LoginPage.propTypes = {
  setUsername: PropTypes.func,
};
