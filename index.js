// server/index.js
require('dotenv').config();
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;
const API_KEY = process.env.PI_API_KEY;

const orders = {};

app.post("/approve", async (req, res) => {
  const { paymentId } = req.body;
  orders[paymentId] = { reserved: true };

  await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
    method: "POST",
    headers: {
      Authorization: `Key ${API_KEY}`,
      "Content-Type": "application/json",
    },
  });

  res.sendStatus(200);
});

app.post("/complete", async (req, res) => {
  const { paymentId, txId } = req.body;
  orders[paymentId].delivered = true;

  await fetch(`https://api.minepi.com/v2/payments/${paymentId}/complete`, {
    method: "POST",
    headers: {
      Authorization: `Key ${API_KEY}`,
      "Content-Type": "application/json",
    },
  });

  res.sendStatus(200);
});

app.post("/cancel", (req, res) => {
  const { paymentId } = req.body;
  delete orders[paymentId];
  res.sendStatus(200);
});

app.post("/incomplete", async (req, res) => {
  const { payment } = req.body;
  const paymentId = payment.identifier;

  if (!orders[paymentId]?.delivered) {
    orders[paymentId].delivered = true;
    await fetch(`https://api.minepi.com/v2/payments/${paymentId}/complete`, {
      method: "POST",
      headers: {
        Authorization: `Key ${API_KEY}`,
        "Content-Type": "application/json",
      },
    });
  }

  res.sendStatus(200);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
