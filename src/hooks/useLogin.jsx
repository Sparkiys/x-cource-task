import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { PropTypes } from "prop-types";
import { useCart } from "./useCart";

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const { clearCart } = useCart();
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem("isLogin") === "true"
  );

  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );

  const [isSignedOut, setIsSignedOut] = useState(false);

  useEffect(() => {
    if (isLogin && !isSignedOut) {
      localStorage.setItem("isLogin", "true");
      localStorage.setItem("username", username);
    } else if (isSignedOut) {
      localStorage.removeItem("isLogin");
      localStorage.removeItem("username");
      localStorage.removeItem("cart");
      setUsername("");
    }
  }, [isLogin, isSignedOut, username]);

  const handleSignOut = () => {
    setIsSignedOut(true);
    setIsLogin(false);
    clearCart();
  };

  const handleSignIn = (name) => {
    setUsername(name);
    setIsLogin(true);
    setIsSignedOut(false);
  };

  return (
    <LoginContext.Provider
      value={{
        username,
        setUsername,
        isLogin,
        setIsLogin,
        handleSignOut,
        handleSignIn,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
