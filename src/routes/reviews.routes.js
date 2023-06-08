const express = require('express');
const { createReview, getReviews } = require('../controllers/Reviews.controller');

const reviewsRouter = express.Router();

reviewsRouter.get("/", getReviews)
reviewsRouter.post('/', createReview)

module.exports = reviewsRouter;