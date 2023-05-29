const { Router } = require('express');
const { getAllMotorcycles, getMotorcycleById, getMotorcycleByName, createMotorcycles, deleteMotorcycle, updateMotorcycle } = require('../controllers/Motorcycle.controller');
const { createOrder } = require('../controllers/Orders.controller');
const { createUser } = require('../controllers/Users.controller');
const { getUser, updateUser } = require('../controllers/Users.controller');


const router = Router();

router.get('/motorcycles', (req, res) => {
    if(req.query.name) getMotorcycleByName(req,res)
    else getAllMotorcycles(req,res)
})

router.get('/motorcycles/:id', getMotorcycleById)
router.post('/motorcycles', createMotorcycles)

router.post('/orders', createOrder)

router.post("/users", createUser)

router.put('/users/:id', updateUser)

router.get('/users/:id', getUser)

//----------------------------------------------------------------
//router.put('/motorcycles/:id', updateMotorcycle)
router.delete('/motorcycle/:id', deleteMotorcycle)

//----------------------------------------------------------------



module.exports = router;
