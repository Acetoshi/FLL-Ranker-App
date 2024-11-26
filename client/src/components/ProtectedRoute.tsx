import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import CenteredSpinner from "./CenteredSpinner";

interface ProtectedRouteProps {
  whitelist: string[];
  children: React.ReactNode;
}

export default function ProtectedRoute({
  whitelist,
  children,
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  // Show loading spinner while the user data is being fetched
  if (loading) {
    return <CenteredSpinner />;
  }

  // Check if the user exists and their role is in the whitelist
  if (user && whitelist.includes(user.role)) {
    return children;
  }

  // Redirect to home if the user is not authorized
  return <Navigate to="/" />;
}
