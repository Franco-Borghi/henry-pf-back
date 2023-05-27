const { Item, Orders, Users } = require('../db.js');

const createOrder = async (req, res) => {

    const { userId, items, amountPaid, orderNumber, orderStatus } = req.body;

    try {
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
                color: item.color
              }
            });
          
            await Item.update(
              {
                orderNumber,
              },
              {
                where: {
                  chassisId: uniqueMotorcycle.chassisId
                }
              }
            );
          }

        res.status(200).json(order);

    } catch (error) {
        res.status(404).json({ error: error.message});
    }
}

module.exports = {
    createOrder
}
