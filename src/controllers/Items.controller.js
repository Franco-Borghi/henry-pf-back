const { Item, Motorcycle } = require('../db.js');

const getItems = async (req, res) => {
  try{
      const items = await Item.findAll({include: Motorcycle})
      res.status(200).json(items);
  }
  catch(err){
      res.status(400).send(err.message)

  }
}

const updateItemSoldStatus = async (req, res) => {
  const { id } = req.params;
  const { sold } = req.body;

  try {
    await Item.update(
      { 
          sold
      },
      {
          where: {
              chassisId: id,
          },
      }
    )

    const updateItem = await Item.findByPk(id);
    res.status(200).json(updateItem);
  } catch (error) {
      res.status(404).send(error.message);
  }
}

module.exports = {
  updateItemSoldStatus,
  getItems
}