const express = require('express')
const { getAllOrders, createOrder, getOrderByUserId, updateOrder } = require('../controllers/Orders.controller');

const ordersRouter = express.Router()

ordersRouter.get('/', getAllOrders)

ordersRouter.post('/', createOrder)

ordersRouter.get("/:id", getOrderByUserId)

ordersRouter.put('/', updateOrder)

module.exports = ordersRouter