import { Navigate , Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";



const Protected = () => {

  const { user, loading } = useAuth();

  if (loading) {
    return <h3>Loading...</h3>;
  }

  if (!user) {
    return <Navigate to="/login" replace={true} />;
  }

  

  return <Outlet />
}



export default Protected;