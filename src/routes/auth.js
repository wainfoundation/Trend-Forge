const express = require('express');
const db = require('../db/db');
const router = express.Router();

// Track authentication events
router.post('/track', (req, res) => {
    const { username, action } = req.body;
    if (!username || !action) {
        return res.status(400).json({ success: false, error: 'Missing username or action' });
    }

    // Store authentication event in database
    db.run(
        `INSERT INTO auth_events (username, action, created_at)
         VALUES (?, ?, ?)`,
        [username, action, new Date().toISOString()],
        (err) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ success: false, error: 'Failed to track event' });
            }
            res.status(200).json({ success: true, message: 'Event tracked' });
        }
    );
});

module.exports = router;
