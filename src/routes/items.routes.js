const express = require('express');
const { getItems, updateItemSoldStatus } = require('../controllers/Items.controller')

const itemsRouter = express.Router();


itemsRouter.get('/', getItems)

itemsRouter.put('/:id', updateItemSoldStatus)

module.exports = itemsRouter;