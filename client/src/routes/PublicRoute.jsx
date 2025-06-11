import { Navigate } from "react-router-dom";
import useUserStore from "../store/userStore";

const PublicRoute = ({ children }) => {
  const user = useUserStore((state) => state.user);

  if (user) {
    if (user.role === "admin") return <Navigate to="/admin" />;
    return <Navigate to="/" />;
  }

  return children;
};

export default PublicRoute;
