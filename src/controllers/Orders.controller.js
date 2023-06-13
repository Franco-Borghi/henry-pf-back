const { Item, Orders, Users, Motorcycle } = require('../db.js');
const { updateMotorcycleStock } = require('../utils/updateStock.js')

const getAllOrders = async(req, res) => {

    const id  = req.query.id;

    try {

        if (id) {
            const order = await Orders.findOne({
                where: {orderNumber: id},
                include: [
                    { model: Users },
                    { model: Item, include: { model: Motorcycle } }
                  ]
            })

            res.status(200).json(order)
        } else {
            const orders = await Orders.findAll({
                include: [{model: Item , include: { model:Motorcycle}}]
            })
            res.status(200).json(orders)
        }

    } catch (error) {
    res.status(404).json({error: "Orders not Found"})
    }
}


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
        const user = await Users.findByPk(userId)
        await order.setUser(user);

      
        
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
    try{
        const {orderStatus, orderNumber } = req.body;

        if (orderStatus.toLowerCase() !== 'cancelled') {
            await Orders.update({ 
                orderStatus,
            },
            { where: { orderNumber: orderNumber } })
            
            const order = await Orders.findByPk(orderNumber)
            res.status(200).json(order);
        }
    }catch(err){
        res.status(400).json(err.message)
    }
}

const getOrderByUserId = async (req, res) => {
    const {id} = req.params
    try {
        const user = await Users.findByPk(id,{
        include: {
            model: Orders,
                include: {
                    model: Item,
                    include: Motorcycle
        }}})
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({error: "Orders not Found"})
    }
}

module.exports = {
    createOrder,
    updateOrder,
    getAllOrders,
    getOrderByUserId
}
