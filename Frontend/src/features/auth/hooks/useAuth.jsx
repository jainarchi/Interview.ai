import { useContext , useEffect } from "react";
import { AuthContext } from "../authContext.jsx";
import { register , login , getMe , logout } from "../services/auth.api.js";



export const useAuth = () => {
  const { user, setUser, loading, setLoading, error, setError } =
    useContext(AuthContext);



  const handleRegister = async ({ username, email, password }) => {
    try {
      setLoading(true);
      const data = await register({ username, email, password })
      setUser(data.user)
      
    } catch (error) {
      console.log(error.message)
      setError(error.message)


    } finally {
      setLoading(false);
    }
  }


  const handleLogin = async ({email , password}) =>{
      try{
        setLoading(true)
        const data = await login({email , password})
        setUser(data.user)

      }catch(error){
        console.log(error.message)
        setError(error.message)

      }finally{
          setLoading(false)
      }
      
  }

   const handleLogout = async () => {
    try {
      setLoading(true)
      await logout()
      setUser(null)

    } catch (error) {
      console.log(error.message)
        setError(error.message)


    } finally {
      setLoading(false)
    }
  }


  const handleGetMe = async () => {
    try {
      setLoading(true)
      const data = await getMe()
      setUser(data.user)

    } catch (error) {
      console.log(error.message)
        setError(error.message)


    } finally {
      setLoading(false)
    }
  }


 

  useEffect(() => {
    handleGetMe()
  }, [])
  
  


  return {
    user,
    loading,
    error,
    handleRegister,
    handleLogin,
    handleLogout,
    handleGetMe
  };
};
