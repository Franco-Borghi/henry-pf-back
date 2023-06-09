const express = require('express');
const { getItems, updateItemColor } = require('../controllers/Items.controller')

const itemsRouter = express.Router();


itemsRouter.get('/', getItems)

itemsRouter.put('/:id', updateItemColor)

module.exports = itemsRouter;