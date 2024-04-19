import React from 'react'
import Login from './components/Login'
import EmployeeList from './components/EmployeeList'
import PrivateRoute from './PrivateRoute'
import AdminDashboard from './pages/AdminDashboard'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeForm from './components/EmployeeForm'
import AdminRoute from './pages/AdminRoute'
const App = () => {
  return (
    <Router>
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
            <Route path="/employees" element={<EmployeeList />} />
            <Route path="/employee/add" element={<EmployeeForm />} />
            {/* <Route path="/employee/update/:id" element={<UpdateEmployee />} /> */}
            <Route element={<AdminRoute />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Route>
        </Route>
    </Routes>
</Router>
  )
}

export default App