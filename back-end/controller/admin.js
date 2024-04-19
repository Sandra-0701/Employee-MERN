// controllers/adminController.js

const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');

// Function to create a new admin account
const createAdmin = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if admin with the same username already exists
        const existingAdmin = await Admin.findOne({ username });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin with this username already exists' });
        }

        // Create a new admin instance
        const admin = new Admin({
            username,
            password // Password will be hashed before saving due to pre-save middleware in the Admin model
        });

        // Save the admin to the database
        await admin.save();

        res.status(201).json({ message: 'Admin created successfully' });
    } catch (error) {
        console.error('Error creating admin:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { createAdmin };
