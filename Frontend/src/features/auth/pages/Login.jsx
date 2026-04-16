import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../hooks/useAuth";
import { loginSchema } from "../validators/auth.validator";
import '../styles/form.scss'

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: zodResolver(loginSchema),
  })

  const { handleLogin, loading, error: backendError, user, clearError } = useAuth();
  const navigate = useNavigate()

  useEffect(() => {
    return () => {
      clearError()
    }
  }, [])

  // useEffect(() => {
  //   if (user) {
  //     navigate("/", { replace: true });
    // }
  // }, [user])

  useEffect(() => {
    if (backendError && backendError.errors) {
      backendError.errors.forEach((err) => {
        setError(err.path, {
          type: "manual",
          message: err.msg,
        });
      })
    }
  }, [backendError, setError]);

  const onSubmit = async (data) => {
    await handleLogin(data);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        
        {/* Header */}
        <div className="auth-header">
          <h1>Welcome back to <span className="highlight">Interview AI</span></h1>
          <p>Sign in to continue your interview preparation journey</p>
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit(onSubmit)} className="auth-form-card">
          
          {/* Backend Error Alert */}
          {backendError && (
            <div className="form-alert">
              {backendError.message || "An error occurred during login"}
            </div>
          )}

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
              placeholder="Enter your password"
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || isSubmitting}
            className="btn-submit"
          >
            {loading || isSubmitting ? (
              <span className="loading">Signing in</span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Footer Links */}
        <div className="auth-footer">
          Don't have an account? <Link to="/register">Create one</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
