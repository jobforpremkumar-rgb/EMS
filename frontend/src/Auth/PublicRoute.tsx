import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function PublicRoute() {
   const token:string | null =  localStorage.getItem("token") || null
  return (
    token  ? <Navigate to="/dashboard" replace />  :  <Outlet />
  )
}

export default PublicRoute