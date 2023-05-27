const { Item, Motorcycle } = require('../db.js');

const updateMotorcycleStock = async (motorcycleId) => {
    try {
        const count = await Item.count({
            where: {
                motorcycleId,
            },
        });

        await Motorcycle.update(
            {
                stock: count,
            },
            {
                where: {
                    id: motorcycleId,
                },
            }
        );
        
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    updateMotorcycleStock
}