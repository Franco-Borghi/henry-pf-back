const { Reviews, Users, Motorcycle } = require('../db.js')

const createReview = async (req, res) => {

    const { rating, comment, userId, motorcycleId } = req.body;

    try {
        const user = await Users.findByPk(userId)
        const motorcycle = await Motorcycle.findByPk(motorcycleId)


        if (!user || !motorcycle) {
            res.status(400).json({ message: 'User or Motorcycle does not exist' });
            return;
        }

        const review = await Reviews.create({
            rating,
            comment,
            userId: user.id,
            motorcycleId: motorcycle.id
        })

        res.status(201).json(review)

    } catch (err) {
        res.status(400).json(err)
    }
}

module.exports = {
    createReview
}