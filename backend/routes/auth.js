const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
    const { username = '', password = '' } = req.body || {};

    if (username === 'admin' && password === 'admin123') {
        return res.status(200).json({
            token: 'demo-token',
            user: { username: 'admin', role: 'admin' }
        });
    }

    if (username === 'staff' && password === 'staff123') {
        return res.status(200).json({
            token: 'demo-token',
            user: { username: 'staff', role: 'staff' }
        });
    }

    if (username === 'student' && password === 'student123') {
        return res.status(200).json({
            token: 'demo-token',
            user: { username: 'student', role: 'student' }
        });
    }

    return res.status(400).json({
        message: 'Invalid username or password'
    });
});

router.post('/register', (req, res) => {
    const { username = '', role = 'student' } = req.body || {};

    return res.status(200).json({
        token: 'demo-token',
        user: { username, role }
    });
});

module.exports = router;