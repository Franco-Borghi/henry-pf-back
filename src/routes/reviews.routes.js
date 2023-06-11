const express = require('express');
const { createReview, getReviews, getReviewsByMotorcycle, getReviewsByUser, updateReview, deleteReview } = require('../controllers/Reviews.controller');

const reviewsRouter = express.Router();

reviewsRouter.get("/", getReviews)
reviewsRouter.post('/', createReview)

reviewsRouter.get("/motorcycles/:motorcycleId", getReviewsByMotorcycle)

reviewsRouter.get("/users/:userId", getReviewsByUser)

reviewsRouter.put("/:reviewId", updateReview)
reviewsRouter.delete("/:reviewId", deleteReview)

module.exports = reviewsRouter;