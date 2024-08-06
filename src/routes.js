const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('./db');
const { authenticateToken, authenticateAdmin } = require('./middleware');
const router = express.Router();

// Register the User
router.post('/signup', async (req, res) => {
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const result = await pool.query(
            'INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING id',
            [username, hashedPassword, email]
        );
        res.json({ status: 'Account successfully created', status_code: 200, user_id: result.rows[0].id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login User
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = result.rows[0];
        if (user && await bcrypt.compare(password, user.password)) {
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
            res.json({ status: 'Login successful', status_code: 200, user_id: user.id, access_token: accessToken });
        } else {
            res.status(401).json({ status: 'Incorrect username/password provided. Please retry', status_code: 401 });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a New Dining Place (Admin only)
router.post('/dining-place/create', authenticateToken, authenticateAdmin, async (req, res) => {
    const { name, address, phone_no, website, open_time, close_time } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO dining_places (name, address, phone_no, website, open_time, close_time) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
            [name, address, phone_no, website, open_time, close_time]
        );
        res.json({ message: `${name} added successfully`, place_id: result.rows[0].id, status_code: 200 });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Search Dining Places by Name
router.get('/dining-place', authenticateToken, async (req, res) => {
    const { name } = req.query;
    try {
        const result = await pool.query('SELECT * FROM dining_places WHERE name ILIKE $1', [`%${name}%`]);
        console.log('Results:', result.rows);
        res.json({ results: result.rows });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});

// Get Dining Place Availability
router.get('/dining-place/availability', authenticateToken, async (req, res) => {
    const { place_id, start_time, end_time } = req.query;
    try {
        const result = await pool.query(
            'SELECT * FROM bookings WHERE place_id = $1 AND start_time < $2 AND end_time > $3',
            [place_id, end_time, start_time]
        );
        console.log('Results:', result.rows);
        res.json({ results: result.rows });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});

// Make a booking
router.post('/dining-place/book', authenticateToken, async (req, res) => {
    const { place_id, start_time, end_time } = req.body;
    const user_id = req.user.id;
    try {
        const result = await pool.query(
            'SELECT * FROM bookings WHERE place_id = $1 AND start_time < $2 AND end_time > $3',
            [place_id, end_time, start_time]
        );
        if (result.rows.length > 0) {
            res.status(400).json({ status: 'Time slot already booked', status_code: 400 });
        } else {
            await pool.query(
                'INSERT INTO bookings (user_id, place_id, start_time, end_time) VALUES ($1, $2, $3, $4)',
                [user_id, place_id, start_time, end_time]
            );
            res.json({ status: 'Booking successful', status_code: 200 });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
