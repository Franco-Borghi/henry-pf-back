const { Router } = require('express');
const motorcycleRouter = require('./motorcycles.routes')
const ordersRouter = require('./orders.routes')
const usersRouter = require('./users.routes')
const reviewsRouter = require('./reviews.routes')
const emailRouter = require('./email.routes')
const itemsRouter = require('./items.routes')



const router = Router();

router.use("/motorcycles", motorcycleRouter)
router.use("/orders", ordersRouter)
router.use("/users", usersRouter)
router.use("/reviews", reviewsRouter)
router.use("/email", emailRouter)
router.use("/items", itemsRouter)

module.exports = router;
