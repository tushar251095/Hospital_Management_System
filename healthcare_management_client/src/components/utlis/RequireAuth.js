import React from 'react'
/* eslint-disable react-hooks/rules-of-hooks */

import { Navigate, Outlet } from "react-router-dom"
export const RequireAuth = ({allowedRoles}) => {
   // console.log(auth.user)
  return (
    localStorage.getItem('token') && allowedRoles.includes(localStorage.getItem('role')) ? <Outlet/> 
    : localStorage.getItem('token') ? <Navigate to={"/"} />
   : <Navigate to={"/user/login"}/>
  )
}

export default RequireAuth;