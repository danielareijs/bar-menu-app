import React from 'react'
import { Outlet } from 'react-router';
import Login from './Login';

const useAuth = () => {
    const user = localStorage.getItem('f6-menu-token');
    return user
}

function ProtectedRoutes() {
    const isAuth = useAuth();
  return (
    isAuth ? <Outlet /> : <Login />
  )
}

export default ProtectedRoutes