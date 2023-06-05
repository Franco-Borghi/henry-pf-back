const { Router } = require('express');
const { getAllMotorcycles, getMotorcycleById, getMotorcycleByName, createMotorcycles, updateMotorcycle, updateItem } = require('../controllers/Motorcycle.controller');
const { getAllOrders, createOrder, getOrderByUserId } = require('../controllers/Orders.controller');
const { createUser } = require('../controllers/Users.controller');
const { getUser, updateUser } = require('../controllers/Users.controller');
const { sendNotificationEmail } = require('../controllers/Email.controller');


const router = Router();

/* ----------------------------------- */
/* Motorcycles                         */
/* ----------------------------------- */

router.get('/motorcycles', (req, res) => {
    if(req.query.name) getMotorcycleByName(req,res)
    else getAllMotorcycles(req,res)
})

router.get('/motorcycles/:id', getMotorcycleById)

router.put('/motorcycles/:id', updateMotorcycle)

router.post('/motorcycles', createMotorcycles)

router.put("/motorcycles/item/:itemId", updateItem)


router.get('/orders', getAllOrders)
/* ----------------------------------- */
/* Orders                              */
/* ----------------------------------- */

router.post('/orders', createOrder)

router.get("/orders/:id", getOrderByUserId)
/* ----------------------------------- */
/* Users                               */
/* ----------------------------------- */

router.post("/users", createUser)

router.put('/users/:id', updateUser)

router.get('/users/:id', getUser)

/* ----------------------------------- */
/* Email                               */
/* ----------------------------------- */

router.post("/email", sendNotificationEmail)

module.exports = router;
