import React from 'react'
import Login from './components/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import EmployeeList from './components/EmployeeList';
import EmployeeListAdmin from './components/EmployeeListAdmin';
import EmployeeForm from './components/EmployeeForm';

const App = () => {
  return (
    <Router>
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
        <Route path="/employee-list-admin" element={<EmployeeListAdmin/>}/>
        <Route path="/employee-add" element={<EmployeeForm/>}/>
        <Route path="/employee-dashboard" element={<EmployeeDashboard/>}/>
        <Route path="/employee-list" element={<EmployeeList/>}/>
        
    </Routes>
</Router>
  )
}

export default App