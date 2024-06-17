// PrivateRoute.tsx
import { FC } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface PrivateRouteProps {
  allowedRoles?: string[];
  element: React.ReactElement;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ allowedRoles, element }) => {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" />;
  }

  return element;
};

export default PrivateRoute;
