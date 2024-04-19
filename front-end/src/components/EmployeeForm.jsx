import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';

function EmployeeForm() {
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [salary, setSalary] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const newEmployee = { name, position, salary, email, password };
            await axiosInstance.post('http://localhost:3000/api/employees/', newEmployee);
            // Optionally, you can redirect the user to another page after successful submission
            // history.push('/employees');
            alert('Employee added successfully!');
        } catch (error) {
            console.error('Error adding employee:', error);
        }
    };

    return (
        <div>
            <h2>Add New Employee</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label>Position:</label>
                    <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} required />
                </div>
                <div>
                    <label>Salary:</label>
                    <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Add Employee</button>
            </form>
        </div>
    );
}

export default EmployeeForm;