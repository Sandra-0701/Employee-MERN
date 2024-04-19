const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the employee by email
        const employee = await Employee.findOne({ email });
        if (!employee) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Verify the password
        const isMatch = await bcrypt.compare(password, employee.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: employee._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
// Get all employees
router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a specific employee by ID
router.get('/:id', getEmployee, (req, res) => {
    res.json(res.employee);
});

// Create a new employee
router.post('/', async (req, res) => {
    const { name, email, password, position, salary } = req.body;
    try {
        const newEmployee = new Employee({
            name,
            email,
            password,
            position,
            salary
        });
        await newEmployee.save();

        

        res.status(201).json({ message: 'Employee created' });
    } catch (error) {
        console.error('Error creating employee:', error);
        res.status(500).json({ message: 'Error creating employee' });
    }
});

// Update an existing employee
router.put('/:id', getEmployee, async (req, res) => {
    if (req.body.name != null) {
        res.employee.name = req.body.name;
    }
    if (req.body.email != null) {
        res.employee.email = req.body.email;
    }
    if (req.body.position != null) {
        res.employee.position = req.body.position;
    }
    if (req.body.salary != null) {
        res.employee.salary = req.body.salary;
    }

    try {
        const updatedEmployee = await res.employee.save();
        res.json(updatedEmployee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete an employee
router.delete('/:id', getEmployee, async (req, res) => {
    try {
        await res.employee.deleteOne();
        res.json({ message: 'Employee deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Middleware function to get employee by ID
async function getEmployee(req, res, next) {
    let employee;
    try {
        employee = await Employee.findById(req.params.id);
        if (employee == null) {
            return res.status(404).json({ message: 'Employee not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

    res.employee = employee;
    next();
}

module.exports = router;
