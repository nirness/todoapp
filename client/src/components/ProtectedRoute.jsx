import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute ({ children }) {
    const { user } = useSelector(state => state.users)
    return Boolean(user) ? children : <Navigate to="/login"/>
}