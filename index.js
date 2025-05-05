require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const { body, validationResult } = require('express-validator');
const winston = require('winston');

// Initialize Express app
const app = express();

// Configure logging
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console()
  ]
});

// Validate environment variables
const API_KEY = process.env.PI_API_KEY;
if (!API_KEY) {
  logger.error('PI_API_KEY is not defined in environment variables');
  process.exit(1);
}

const PORT = process.env.PORT || 5000;
const ALLOWED_ORIGINS = ['https://trendforge.com', 'http://localhost:3000']; // Update with your frontend domains

// In-memory storage (replace with database in production)
const orders = {};

// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || ALLOWED_ORIGINS.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['POST'],
    credentials: true
  })
);
app.use(express.json());

// API call utility function
const callPiApi = async (endpoint, method, body = null) => {
  const options = {
    method,
    headers: {
      Authorization: `Key ${API_KEY}`,
      'Content-Type': 'application/json'
    }
  };
  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`https://api.minepi.com/v2${endpoint}`, options);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`Pi API error: ${response.status} - ${errorData.message || 'Unknown error'}`);
  }
  return response.json();
};

// Middleware to validate paymentId
const validatePaymentId = [
  body('paymentId').isString().notEmpty().withMessage('paymentId is required'),
];

// Middleware to validate txId
const validateTxId = [
  body('txId').isString().notEmpty().withMessage('txId is required'),
];

// Middleware to validate payment object
const validatePayment = [
  body('payment').isObject().withMessage('payment must be an object'),
  body('payment.identifier').isString().notEmpty().withMessage('payment.identifier is required'),
];

// Error handling for validation
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.warn('Validation error', { errors: errors.array() });
    return res.status(400).json({ status: 'error', message: errors.array()[0].msg });
  }
  next();
};

// Approve payment
app.post(
  '/approve',
  validatePaymentId,
  handleValidationErrors,
  async (req, res, next) => {
    const { paymentId } = req.body;
    try {
      logger.info(`Approving payment: ${paymentId}`);
      orders[paymentId] = { reserved: true, delivered: false }; // Store in database in production
      await callPiApi(`/payments/${paymentId}/approve`, 'POST');
      logger.info(`Payment approved: ${paymentId}`);
      res.status(200).json({ status: 'success', message: 'Payment approved' });
    } catch (error) {
      logger.error(`Error approving payment ${paymentId}: ${error.message}`);
      next(error);
    }
  }
);

// Complete payment
app.post(
  '/complete',
  [...validatePaymentId, ...validateTxId],
  handleValidationErrors,
  async (req, res, next) => {
    const { paymentId, txId } = req.body;
    try {
      logger.info(`Completing payment: ${paymentId}`);
      if (!orders[paymentId]) {
        throw new Error(`Payment ${paymentId} not found`);
      }
      orders[paymentId].delivered = true; // Update in database in production
      await callPiApi(`/payments/${paymentId}/complete`, 'POST', { txid: txId });
      logger.info(`Payment completed: ${paymentId}`);
      res.status(200).json({ status: 'success', message: 'Payment completed' });
    } catch (error) {
      logger.error(`Error completing payment ${paymentId}: ${error.message}`);
      next(error);
    }
  }
);

// Cancel payment
app.post(
  '/cancel',
  validatePaymentId,
  handleValidationErrors,
  async (req, res, next) => {
    const { paymentId } = req.body;
    try {
      logger.info(`Cancelling payment: ${paymentId}`);
      if (!orders[paymentId]) {
        throw new Error(`Payment ${paymentId} not found`);
      }
      delete orders[paymentId]; // Delete from database in production
      logger.info(`Payment cancelled: ${paymentId}`);
      res.status(200).json({ status: 'success', message: 'Payment cancelled' });
    } catch (error) {
      logger.error(`Error cancelling payment ${paymentId}: ${error.message}`);
      next(error);
    }
  }
);

// Handle incomplete payment
app.post(
  '/incomplete',
  validatePayment,
  handleValidationErrors,
  async (req, res, next) => {
    const { payment } = req.body;
    const paymentId = payment.identifier;
    try {
      logger.info(`Handling incomplete payment: ${paymentId}`);
      if (!orders[paymentId]) {
        orders[paymentId] = { reserved: true, delivered: false }; // Store in database in production
      }
      if (!orders[paymentId].delivered) {
        orders[paymentId].delivered = true; // Update in database in production
        const txid = payment.transaction?.txid;
        if (!txid) {
          throw new Error('Transaction ID missing for incomplete payment');
        }
        await callPiApi(`/payments/${paymentId}/complete`, 'POST', { txid });
        logger.info(`Incomplete payment completed: ${paymentId}`);
      }
      res.status(200).json({ status: 'success', message: 'Incomplete payment processed' });
    } catch (error) {
      logger.error(`Error processing incomplete payment ${paymentId}: ${error.message}`);
      next(error);
    }
  }
);

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(`Unhandled error: ${err.message}`, { stack: err.stack });
  res.status(500).json({ status: 'error', message: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

const express = require('express');
const dotenv = require('dotenv');
const paymentRoutes = require('./routes/payments');
const authRoutes = require('./routes/auth');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/payments', paymentRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
