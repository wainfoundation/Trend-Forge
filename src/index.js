const express = require('express');
const dotenv = require('dotenv');
const paymentRoutes = require('./routes/payments');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/payments', paymentRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
