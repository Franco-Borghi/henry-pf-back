const { Item, Motorcycle } = require('../db.js');

const getItems = async (req, res) => {
  try{
      const items = await Item.findAll({include: Motorcycle})

      res.status(200).json(items);
  }
  catch(err){
      res.status(400).json(err)

  }
}

const updateItemColor = async (req, res) => {
  const { id } = req.params;
  const { color } = req.body;

  try {
    await Item.update(
      { 
          color
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
      res.status(404).json(error);
  }
}

const getAllSoldItems = async (req, res) => {
  try {
      const soldItems = await Item.findAll({
          where: {
              sold: true
          },
          include: Motorcycle
      })
      res.status(200).json(soldItems)
  } catch (error) {
      res.status(404).json(error);
  }
}

module.exports = {
  updateItemColor,
  getItems,
  getAllSoldItems
}