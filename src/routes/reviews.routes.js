const express = require('express');
const { createReview, getReviews, getReviewsByMotorcycle, getReviewsByUser } = require('../controllers/Reviews.controller');

const reviewsRouter = express.Router();

reviewsRouter.get("/", getReviews)
reviewsRouter.post('/', createReview)

reviewsRouter.get("/:motorcycleId", getReviewsByMotorcycle)
reviewsRouter.get("/:userId", getReviewsByUser)

module.exports = reviewsRouter;