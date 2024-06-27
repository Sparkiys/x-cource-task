import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useLogin } from "./useLogin";

export const PrivateRoute = ({ children }) => {
  const { isLogin } = useLogin();
  const location = useLocation();

  if (!isLogin) {
    return (
      <Navigate
        to="x-cource-task"
        state={{ from: location }}
      />
    );
  }

  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
