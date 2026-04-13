import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '../hooks/useAuth'
import { registerSchema } from '../validators/auth.validator'

const Register = () => {
    const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      setError,
    } = useForm({
      resolver: zodResolver(registerSchema),
    })

    const {handleRegister , loading, error: backendError , user , clearError } = useAuth()
    const navigate = useNavigate()


    useEffect(() => {
      
      return () => {
        clearError()
      }
    }, [])
    

     useEffect(() => {
     
      if(user){
         navigate("/" , { replace : true})
      }
     }, [ user])
     

 

    useEffect(() => {
      if (backendError && backendError.errors) {
        backendError.errors.forEach((err) => {
          setError(err.path, {
            type: "manual",
            message: err.msg,
          })
        })
      }
    }, [backendError, setError])


    
    const onSubmit = async (data) => {
      await handleRegister(data)
      if(user){
        console.log(user)
       return navigate("/" , { replace : true})
      }
     
    }



   
 return (
    <div>
        <h2>Register</h2>

        <p>{backendError ? backendError : ""}</p>


        <form onSubmit={handleSubmit(onSubmit)}>

            <div>
              <input 
              type="text"
              placeholder="username"
              {...register("username")}
              />
              {errors.username && <p style={{ color: "red" }}>{errors.username.message}</p>}
            </div>
            <div>
              <input 
              type="email"
              placeholder="email"
              {...register("email")}
              />
              {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
            </div>
            <div>
              <input 
              type="password"
              placeholder="password"
              {...register("password")}
              />
              {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
            </div>
            <button type="submit" disabled={loading || isSubmitting}>
              {loading ? "Registering..." : "Register"}
            </button>
        </form>
        <Link to="/login">Login</Link>
    </div>
 )
}

export default Register
