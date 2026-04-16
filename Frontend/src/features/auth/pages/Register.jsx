import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '../hooks/useAuth'
import { registerSchema } from '../validators/auth.validator'
import '../styles/form.scss'

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: zodResolver(registerSchema),
  })

  const { handleRegister, loading, error: backendError, user, clearError } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    return () => {
      clearError()
    }
  }, [])

  // useEffect(() => {
  //   if (user) {
  //     navigate("/", { replace: true })
  //   }
  // }, [user])

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
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        
        {/* Header */}
        <div className="auth-header">
          <h1>Create Your <span className="highlight">Interview AI</span> Account</h1>
          <p>Join thousands of candidates preparing smarter, not harder</p>
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit(onSubmit)} className="auth-form-card">
          
          {/* Backend Error Alert */}
          {backendError && (
            <div className="form-alert">
              {backendError.message || "An error occurred during registration"}
            </div>
          )}

          {/* Username Field */}
          <div className="form-group">
            <label htmlFor="username">
              Username
              <span className="required">*</span>
            </label>
            <input
              id="username"
              type="text"
              placeholder="Choose a username"
              {...register("username")}
              className={errors.username ? "error" : ""}
            />
            {errors.username && (
              <p className="form-error">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email">
              Email Address
              <span className="required">*</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className={errors.email ? "error" : ""}
            />
            {errors.email && (
              <p className="form-error">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password">
              Password
              <span className="required">*</span>
            </label>
            <input
              id="password"
              type="password"
              placeholder="Create a strong password"
              {...register("password")}
              className={errors.password ? "error" : ""}
            />
            {errors.password && (
              <p className="form-error">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Info Box */}
          {/* <div className="info-box">
            <p>Use a <strong>strong password</strong> with at least 8 characters, including uppercase, lowercase, and numbers.</p>
          </div> */}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || isSubmitting}
            className="btn-submit"
          >
            {loading || isSubmitting ? (
              <span className="loading">Creating account</span>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Footer Links */}
        <div className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  )
}

export default Register
