import { Navigate, Outlet } from "react-router-dom";
import useUserStore from "../store/userStore";

const ProtectedRoute = ({ requiredRole }) => {
  const user = useUserStore((state) => state.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;