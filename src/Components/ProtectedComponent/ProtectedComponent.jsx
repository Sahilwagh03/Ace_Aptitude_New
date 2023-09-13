import React from 'react'
import { Navigate , Outlet} from 'react-router-dom'


export const ProtectedComponent = () => {
  const auth = localStorage.getItem('user')
  return auth? <Outlet/> : <Navigate to='/Login'/>
}
