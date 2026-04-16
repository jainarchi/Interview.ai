import {createBrowserRouter} from "react-router-dom";
import Register from "../features/auth/pages/Register.jsx";
import Login from "../features/auth/pages/Login.jsx";
import Protected from "../features/auth/components/Protected.jsx";
import Home from "../features/interview/pages/Home.jsx";
import Interview from "../features/interview/pages/Interview.jsx";


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
    element: <Protected />,
    children : [
    {
        path : "/",
        element : <Home />
    },
    {
        path: '/Interview/:interviewId',
        element: <Interview />
    },
    {
        path : '*',
        element : <Home />
    }
  ]

   }


])