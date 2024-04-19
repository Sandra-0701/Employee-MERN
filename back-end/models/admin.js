// models/admin.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Middleware to hash the password before saving
adminSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare password for login
adminSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Function to create admin username and password
adminSchema.statics.createAdmin = async function({ username, password }) {
    try {
        // Check if admin with the same username already exists
        const existingAdmin = await this.findOne({ username });
        if (existingAdmin) {
            throw new Error('Admin with this username already exists');
        }

        // Create a new admin instance
        const admin = new this({
            username,
            password // Password will be hashed before saving due to pre-save middleware in the Admin model
        });

        // Save the admin to the database
        await admin.save();
        return admin;
    } catch (error) {
        throw error;
    }
};

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
