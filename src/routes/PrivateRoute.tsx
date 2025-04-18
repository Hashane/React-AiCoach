import { Navigate } from "react-router-dom";

function PrivateRoute({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem("access_token");

  return token ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
