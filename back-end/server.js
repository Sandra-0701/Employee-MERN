// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./db/connection');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
const employeeRoutes = require('./routes/employee');
const adminRoutes = require('./routes/admin');

app.use('/api/employees', employeeRoutes);
app.use('/api/admin', adminRoutes);

// MongoDB Connection
connectDB();

// Starting the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
