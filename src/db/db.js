const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./payments.db');

// Initialize database
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS payments (
            id TEXT PRIMARY KEY,
            user_uid TEXT,
            amount REAL,
            memo TEXT,
            metadata TEXT,
            status TEXT,
            txid TEXT,
            created_at TEXT
        )
    `);
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            user_uid TEXT PRIMARY KEY,
            isSubscribed BOOLEAN,
            subscription_end TEXT
        )
    `);
});

module.exports = db;
