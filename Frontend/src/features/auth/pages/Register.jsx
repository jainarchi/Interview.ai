import React, { useState } from 'react'
import { Link , useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
const Register = () => {
    const {handleRegister , loading} = useAuth()
    const navigate = useNavigate()

   const [form, setForm] = useState({
    username : "",
    email : "",
    password : ""
   })


   const handleChange = (e) =>{
    setForm({...form , [e.target.name] : e.target.value})
   }

   const handleSubmit = (e) =>{
    e.preventDefault()
    handleRegister(form)
    navigate('/login')
   }


   
 return (
    <div>
        register
        <form onSubmit={handleSubmit}>
            <input 
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="username"
            />
            <input 
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="email"
            />
            <input 
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="password"
            />
            <button type="submit" disabled={loading}>Register</button>
        </form>
        <Link to="/login">Login</Link>
    </div>
 )
}

export default Register
