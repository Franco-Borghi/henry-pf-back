const { Router } = require('express');
const { sendNotificationEmail } = require('../controllers/Email.controller');
const { createReview } = require('../controllers/Reviews.controller');
const motorcycleRouter = require('./motorcycles.routes')
const ordersRouter = require('./orders.routes')
const usersRouter = require('./users.routes')


const router = Router();

router.use("/motorcycles", motorcycleRouter)

router.use("/orders", ordersRouter)

router.use("/users", usersRouter)

/* ----------------------------------- */
/* Email                               */
/* ----------------------------------- */

router.post("/email", sendNotificationEmail)

/* ----------------------------------- */
/* Reviews                             */
/* ----------------------------------- */
router.post('/reviews', createReview)




module.exports = router;