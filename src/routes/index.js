const { Router } = require('express');
const { getAllMotorcycles, getMotorcycleById, getMotorcycleByName, createMotorcycles, updateMotorcycle, updateItem } = require('../controllers/Motorcycle.controller');
const { getAllOrders, createOrder, getOrderByUserId, updateOrder } = require('../controllers/Orders.controller');
const { createUser } = require('../controllers/Users.controller');
const { getUser, updateUser, getUsers } = require('../controllers/Users.controller');
const { sendNotificationEmail } = require('../controllers/Email.controller');
const { updateItemSoldStatus, getItems } = require('../controllers/Items.controller');


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

/* ----------------------------------- */
/* Items                               */
/* ----------------------------------- */

router.get('/items', getItems)

router.put('/item/:id', updateItemSoldStatus)

/* ----------------------------------- */
/* Orders                              */
/* ----------------------------------- */

router.get('/orders', getAllOrders)

router.post('/orders', createOrder)

router.get("/orders/:id", getOrderByUserId)

router.put('/order', updateOrder)

/* ----------------------------------- */
/* Users                               */
/* ----------------------------------- */

router.post("/users", createUser)

router.get('/users', getUsers)

router.put('/users/:id', updateUser)

router.get('/users/:id', getUser)

/* ----------------------------------- */
/* Email                               */
/* ----------------------------------- */

router.post("/email", sendNotificationEmail)

module.exports = router;
