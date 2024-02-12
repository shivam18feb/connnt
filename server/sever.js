const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());

// Set secure HTTP headers
app.use(helmet());

// Limit payload size
app.use(bodyParser.json({ limit: '1mb' }));

// Rate limiting middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per window
});
app.use('/user', limiter);

const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'testing'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.message);
        process.exit(1);
    } else {
        console.log('Connected to database');
    }
});

// Root route
app.get('/', (req, res) => {
    return res.json("from Backend side");
});

// Retrieve user data
app.get('/user', (req, res) => {
    const sql = "SELECT * FROM user";
    db.query(sql, (err, data) => {
        if (err) return res.status(500).json({ error: "Internal Server Error" });
        return res.json(data);
    });
});
app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    const sql = "SELECT * FROM user WHERE id = ?";
    db.query(sql, userId, (err, data) => {
        if (err) return res.status(500).json({ error: "Internal Server Error" });
        if (data.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.json(data[0]);
    });
});

// Insert data into user table
app.post('/user', (req, res) => {
    const { Name, Email } = req.body;

    // Validate inputs
    if (!Name || !Email) {
        return res.status(400).json({ error: "Bad Request: Name and Email are required" });
    }

    const sql = "INSERT INTO user (Name, Email) VALUES (?, ?)";
    const values = [Name, Email];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error inserting data:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json({ message: "Data inserted successfully", result });
    });
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
