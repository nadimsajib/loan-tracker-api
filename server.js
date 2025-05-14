// server.js
const express = require('express');
const cors = require('cors');
const loansRouter = require('./routes/loan');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/loans', loansRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
