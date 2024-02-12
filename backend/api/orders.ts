import { Router } from "express";
const router = Router();


const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");

var mockedOrders = [
    { 
        "order": {
          "id": "1",
          "status": "PAID",
          "amount": 10.32,
          "currency": "EUR"
        }
      },
       {
        "order": {
          "id": "2",
          "status": "PAID",
          "amount": 7.12,
          "currency": "EUR"
        }
      },
      {
        "order": {
          "id": "3",
          "status": "PENDING",
          "amount": 12.45,
          "currency": "EUR"
        }
      }
];

router.use(bodyParser.json());
router.use(express.static(path.join(__dirname, '../frontend/out')));

router.get('/orders/:id', (req: any, res: any) => {
    console.log(`orders`)
    const order = mockedOrders.find((item: any) => item.order.id == req.params.id)
    res.json(order);
});

router.delete('/orders/:id', (req: any, res: any) => {
  console.log(`Deleting order with id ${req.params.id}`);
  const orderIndex = mockedOrders.findIndex((item) => item.order.id == req.params.id)
  mockedOrders.splice(orderIndex, 1)
  res.sendStatus(200)
});

router.get('/', (req: any, res: any) => {
  res.sendFile(path.join(__dirname, '../frontend/out/index.html'));
});

export default router