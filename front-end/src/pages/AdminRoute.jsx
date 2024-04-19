import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    // Assuming user role is saved in local storage after login
    return user && user.role === 'admin' ? <Outlet /> : <Navigate to="/admin" />;
};

export default AdminRoute;
