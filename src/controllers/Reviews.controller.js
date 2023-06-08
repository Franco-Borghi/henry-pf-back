const { Reviews, Users, Motorcycle } = require('../db.js')

const createReview = async (req, res) => {

    const { rating, comment, userId, motorcycleId } = req.body;

    try {
        const user = await Users.findByPk(userId)
        const motorcycle = await Motorcycle.findByPk(motorcycleId)

             // Check whether the user and motorcycle exist
             if (!user || !motorcycle) {
                res.status(400).json({message: 'User or Motorcycle does not exist'});
                return;
            }
        console.log("User", user)
        console.log("motorcycle", motorcycle)

        const review = await Reviews.create({
            rating,
            comment,
            userId: user.id,
            motorcycleId: motorcycle.id
        })

        console.log("Review", review)
 

        // await review.setUser(user)
        // await review.setMotorcycle(motorcycle)

        res.status(201).json(review)

    } catch (err) {
        res.status(400).json(err)
    }
}

module.exports = {
    createReview
}