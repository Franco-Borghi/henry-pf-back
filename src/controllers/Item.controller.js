const {Item } = require('../db.js');

const getItemsByOrderNumber = async (req, res) =>{
    const { orderNumber } = req.params // Chequear si lo pasamos por params
    try {
        const items = await Item.findAll({
            where: {orderNumber}
        })
        res.status(200).json(items)
    } catch (error) {
        res.status(404).send(error.message)
    }
}

module.exports = {
    getItemsByOrderNumber
}