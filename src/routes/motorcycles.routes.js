const express = require('express')
const { getAllMotorcycles, getMotorcycleById, getMotorcycleByName, createMotorcycles, updateMotorcycle, updateItem } = require('../controllers/Motorcycle.controller');

const motorcycleRouter = express.Router()


motorcycleRouter.get('/', (req, res) => {
    if(req.query.name) getMotorcycleByName(req,res)
    else getAllMotorcycles(req,res)
})

motorcycleRouter.get('/:id', getMotorcycleById)

motorcycleRouter.put('/:id', updateMotorcycle)

motorcycleRouter.post('/', createMotorcycles)

motorcycleRouter.put("/item/:itemId", updateItem)

module.exports = motorcycleRouter