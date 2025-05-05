const express = require('express');
const axios = require('axios');
const db = require('../db/db');
const router = express.Router();

const PI_API_KEY = process.env.PI_API_KEY;
const axiosClient = axios.create({
    baseURL: 'https://api.minepi.com',
    timeout: 20000,
    headers: {
        'Authorization': `Key ${PI_API_KEY}`,
        'Content-Type': 'application/json'
    }
});

// Approve Payment
router.post('/approve/:paymentId', async (req, res) => {
    const { paymentId } = req.params;
    try {
        const response = await axiosClient.post(`/v2/payments/${paymentId}/approve`);
        if (response.status === 200) {
            // Update payment status in database
            db.run(
                `UPDATE payments SET status = 'approved' WHERE id = ?`,
                [paymentId],
                (err) => {
                    if (err) console.error('Database error:', err);
                }
            );
            res.status(200).json({ success: true, message: 'Payment approved' });
        } else {
            throw new Error('Approval failed');
        }
    } catch (error) {
        console.error('Payment approval error:', error.message);
        res.status(500).json({ success: false, error: 'Approval failed' });
    }
});

// Complete Payment
router.post('/complete/:paymentId', async (req, res) => {
    const { paymentId } = req.params;
    const { txid, user_uid } = req.body; // Sent from frontend onReadyForServerCompletion

    try {
        const response = await axiosClient.post(`/v2/payments/${paymentId}/complete`, { txid });
        if (response.status === 200) {
            // Update payment status and store txid
            db.run(
                `UPDATE payments SET status = 'completed', txid = ? WHERE id = ?`,
                [txid, paymentId],
                (err) => {
                    if (err) console.error('Database error:', err);
                }
            );

            // Update user subscription (e.g., 1-year subscription)
            const subscriptionEnd = new Date();
            subscriptionEnd.setFullYear(subscriptionEnd.getFullYear() + 1);
            db.run(
                `INSERT OR REPLACE INTO users (user_uid, isSubscribed, subscription_end)
                 VALUES (?, ?, ?)`,
                [user_uid, 1, subscriptionEnd.toISOString()],
                (err) => {
                    if (err) console.error('Database error:', err);
                }
            );

            res.status(200).json({ success: true, message: 'Payment completed' });
        } else {
            throw new Error('Completion failed');
        }
    } catch (error) {
        console.error('Payment completion error:', error.message);
        res.status(500).json({ success: false, error: 'Completion failed' });
    }
});

// Store Payment Data (called from frontend on createPayment)
router.post('/store', (req, res) => {
    const { paymentId, user_uid, amount, memo, metadata } = req.body;
    db.run(
        `INSERT INTO payments (id, user_uid, amount, memo, metadata, status, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [paymentId, user_uid, amount, memo, JSON.stringify(metadata), 'pending', new Date().toISOString()],
        (err) => {
            if (err) {
                console.error('Database error:', err);
                res.status(500).json({ success: false, error: 'Failed to store payment' });
            } else {
                res.status(200).json({ success: true, message: 'Payment stored' });
            }
        }
    );
});

module.exports = router;
