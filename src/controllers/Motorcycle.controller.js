const {Item, Motorcycle} = require('../db.js');
const { Op } = require('sequelize');


const getAllMotorcycles = async (req, res) => {
}

const getMotorcycleById = async (req, res) => {

    const {id} = req.params;

    try {
        const motorcycle = await Motorcycle.findByPk(id, { include: Item });
        res.status(200).json(motorcycle);

    } catch (error) {
        res.status(404).json({error: 'Motorcycle not found'});
    }
}

const getMotorcycleByName = async (req, res) => {
    
    const {name} = req.query;
    
    try {
        const motorcycle = await Motorcycle.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            },
            include: Item
        });
        res.status(200).json(motorcycle);

    } catch (error) {
        res.json({error: 'Motorcycle not found'});
    }
}

const createMotorcycles = async (req, res) => {
}

module.exports = {
    getMotorcycleById,
    getAllMotorcycles,
    createMotorcycles,
    getMotorcycleByName
}