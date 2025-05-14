// db.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Use /data path on Render (persistent disk)
const dbPath = path.join('/data', 'loans.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS loans (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date_given TEXT,
      return_date TEXT,
      transaction_type TEXT,
      remarks TEXT
    )
  `);
});

module.exports = db;
