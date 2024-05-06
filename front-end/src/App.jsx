import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import EmployeeList from './components/EmployeeList';
import EmployeeListAdmin from './components/EmployeeListAdmin';
import EmployeeForm from './components/EmployeeForm';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Function to set login status
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Function to set logout status
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token'); // Clear token from local storage on logout
  };

  // Protected Route Component
  const PrivateRoute = ({ element, path }) => {
    return isLoggedIn ? element : <Navigate to="/" />;
  };

  // Login Route Component
  const LoginRoute = ({ element, path }) => {
    return isLoggedIn ? <Navigate to="/admin-dashboard" /> : element;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginRoute element={<Login onLogin={handleLogin} />} />} />
        <Route path="/admin-dashboard" element={<PrivateRoute element={<AdminDashboard />} />} />
        <Route path="/employee-list-admin" element={<PrivateRoute element={<EmployeeListAdmin />} />} />
        <Route path="/employee-add" element={<PrivateRoute element={<EmployeeForm />} />} />
        <Route path="/employee-dashboard" element={<PrivateRoute element={<EmployeeDashboard />} />} />
        <Route path="/employee-list" element={<PrivateRoute element={<EmployeeList />} />} />
        <Route path="/employee-form/:id" element={<PrivateRoute element={<EmployeeForm />} />} />
      </Routes>
    </Router>
  );
};

export default App;
