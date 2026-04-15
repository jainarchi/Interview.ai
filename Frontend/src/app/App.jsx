import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { appRoutes } from './app.routes.jsx'
import { AuthProvider } from '../features/auth/authContext.jsx'
import { InterviewProvider } from '../features/interview/interviewContext.jsx'
const App = () => {
  return (
    <>

    <AuthProvider>
      <InterviewProvider>

        <RouterProvider router={appRoutes} />
        
      </InterviewProvider>
    </AuthProvider>
      
    </>
  )
}

export default App
