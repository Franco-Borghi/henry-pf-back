const { Item, Orders, Users, Motorcycle } = require('../db.js');
const { updateMotorcycleStock } = require('../utils/updateStock.js')

const createOrder = async (req, res) => {

    const { userId, items, amountPaid, orderNumber, orderStatus } = req.body;

    try {

        for (const item of items) {

            const uniqueMotorcycle = await Item.findOne({
                where: {
                    motorcycleId: item.id,
                    color: item.color,
                    sold: false,
                }
            });
            if (!uniqueMotorcycle) throw new Error(`Motorcycle with id ${item.id} and color ${item.color} not found`)
        }


        const currentDate = new Date();

        const formattedDate = currentDate.toISOString().split("T")[0];
        const order = await Orders.create({
            orderNumber,
            date: formattedDate,
            amountPaid,
            orderStatus,
        });

        // TODO: add user when we have the controller to create users
        // const user = await Users.findByPk(userId);
        // await order.setUser(user);

        // console.log(item)
        for (const item of items) {

            const uniqueMotorcycle = await Item.findOne({
                where: {
                    motorcycleId: item.id,
                    color: item.color,
                    sold: false,
                }
            });


                await Item.update(
                    {
                        orderNumber,
                        sold: true
                    },
                    {
                        where: {
                            chassisId: uniqueMotorcycle.chassisId
                        }
                    }
                    );
                    
                    updateMotorcycleStock(uniqueMotorcycle.motorcycleId);
    
        }


        res.status(200).json(order);

    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

//TODO: cuando el onApprove de paypal de cancelado habria que ir todo para atras. Si da approved, solo hay que updatear el status a Approved
const updateOrder = async (req, res) => {
}

module.exports = {
    createOrder,
    updateOrder
}
