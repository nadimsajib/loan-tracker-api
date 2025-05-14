// routes/loans.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Create Loan
router.post('/', (req, res) => {
  const { date_given, return_date, transaction_type, remarks } = req.body;
  const query = `INSERT INTO loans (date_given, return_date, transaction_type, remarks) VALUES (?, ?, ?, ?)`;
  db.run(query, [date_given, return_date, transaction_type, remarks], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID });
  });
});

// Read All Loans
router.get('/', (req, res) => {
  db.all(`SELECT * FROM loans`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Update Loan
router.put('/:id', (req, res) => {
  const { date_given, return_date, transaction_type, remarks } = req.body;
  const query = `UPDATE loans SET date_given=?, return_date=?, transaction_type=?, remarks=? WHERE id=?`;
  db.run(query, [date_given, return_date, transaction_type, remarks, req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ updated: this.changes });
  });
});

// Delete Loan
router.delete('/:id', (req, res) => {
  db.run(`DELETE FROM loans WHERE id=?`, [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

module.exports = router;
