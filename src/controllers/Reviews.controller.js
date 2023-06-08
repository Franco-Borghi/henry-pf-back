const { Reviews, Users, Motorcycle } = require('../db.js')

const createReview = async (req, res) => {

    const { rating, comment, userId, motorcycleId } = req.body;

    console.log(req.body)

    try {
        const review = await Reviews.create({
            rating,
            comment
        })

        console.log(review)

        const user = await Users.findByPk(userId)
        const motorcycle = await Motorcycle.findByPk(motorcycleId)

        console.log(user)
        console.log(motorcycle)

        await review.setUser(user)
        await review.setMotorcycle(motorcycle)

        res.status(200).json(review)

    } catch (err) {
        res.status(400).json(err)
    }
}

module.exports = {
    createReview
}