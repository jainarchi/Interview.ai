import {createBrowserRouter} from "react-router-dom";
import Register from "../features/auth/pages/Register.jsx";
import Login from "../features/auth/pages/Login.jsx";
import Protected from "../features/auth/components/Protected.jsx";



export const appRoutes = createBrowserRouter([
    {
        path : "/register",
        element : <Register/>   
    },
    {
        path : "/login",
        element : <Login/>
    },
    {
        path : "/",
        element : <Protected><h1>Home Page</h1></Protected>
    }

])