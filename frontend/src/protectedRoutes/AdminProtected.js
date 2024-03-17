import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const AdminProtectedRoute = ({ children }) => {
  const { isAdmin, loading } = useSelector((state) => state.admin);
  if (loading === false) {
    if (!isAdmin) {
      return <Navigate to="/admin/login" replace />;
    }
    return children;
  }
};
export default AdminProtectedRoute;
