import { Navigate, Outlet } from "react-router-dom";
import useUserStore from "../store/userStore";

const ProtectedRoute = ({ requiredRole ,children }) => {
  const user = useUserStore((state) => state.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;