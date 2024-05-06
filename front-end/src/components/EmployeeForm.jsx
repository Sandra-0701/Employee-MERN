import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';
import { TextField, Button, Typography, Container, Box } from '@mui/material';

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
            await axiosInstance.post('/admin/employee', newEmployee);
            // Optionally, you can redirect the user to another page after successful submission
            // history.push('/employees');
            alert('Employee added successfully!');
        } catch (error) {
            console.error('Error adding employee:', error);
        }
    };

    return (
        <>
        <Container maxWidth="md">
            <Box sx={{ marginTop: 4 }}>
                <Typography variant="h4" gutterBottom>Add New Employee</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Position"
                        type="text"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Salary"
                        type="number"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
                        Add Employee
                    </Button>
                </form>
            </Box>
        </Container>
        </>
        
    );
}

export default EmployeeForm;
