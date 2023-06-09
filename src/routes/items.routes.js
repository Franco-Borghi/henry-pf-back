const express = require('express');
const { getItems, updateItemColor, getAllSoldItems } = require('../controllers/Items.controller')

const itemsRouter = express.Router();


itemsRouter.get('/', getItems)

itemsRouter.put('/:id', updateItemColor)

itemsRouter.get("/sold", getAllSoldItems)

module.exports = itemsRouter;