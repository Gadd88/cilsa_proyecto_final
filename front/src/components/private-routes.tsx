import { Navigate } from "react-router-dom";
import { checkAuth } from '../utils/checkAuth'

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const loged = checkAuth();
  
  if (loged) {
    return children;
  } else {
    return <Navigate to="/auth"/>;
  }
};
