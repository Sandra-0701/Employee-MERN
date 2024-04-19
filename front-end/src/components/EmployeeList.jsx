// EmployeeList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/employees')
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => {
        console.error('Error fetching employees:', error);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h2>Employee List</h2>
      <div className="row">
        {employees.map(employee => (
          <div key={employee.id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{employee.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{employee.position}</h6>
                <p className="card-text">Salary: ${employee.salary}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmployeeList;
