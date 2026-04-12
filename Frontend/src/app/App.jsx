import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { appRoutes } from './app.routes.jsx'
import { AuthProvider } from '../features/auth/authContext.jsx'

const App = () => {
  return (
    <>

    <AuthProvider>

        <RouterProvider router={appRoutes} />

    </AuthProvider>
      
    </>
  )
}

export default App
