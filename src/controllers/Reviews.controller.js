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

const getReviews = async (req, res) => {
    try {
        const reviews = await Reviews.findAll({
            include: [
                {
                    model: Users,
                    attributes: ['name', 'email']
                },
                {
                    model: Motorcycle,
                    attributes: ['name', 'brand', 'model']
                }
            ]
        })
        res.status(200).json(reviews)
    } catch (err) {
        res.status(400).json(err)
    }
}





module.exports = {
    createReview,
    getReviews,
}