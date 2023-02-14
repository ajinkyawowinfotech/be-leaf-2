import React from 'react'
import { useContext } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { AuthContext } from '../AuthContext/AuthContext'

const ProtectedRoute = () => {
   const {isLoggedIn} = useContext(AuthContext)
   const navigate = useNavigate()
  return (
    <div>
        {isLoggedIn ? <Outlet/> : (
          alert("Please Sign In First"),
          <Navigate to='/signin'/>
        )}
    </div>
  )
}

export default ProtectedRoute