const express = require('express');
const { sendNotificationEmail } = require('../controllers/Email.controller');

const emailRouter = express.Router();

emailRouter.post("/", sendNotificationEmail)

module.exports = emailRouter;