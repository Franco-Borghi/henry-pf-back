const {Item, Motorcycle} = require('../db.js');
const { Op, literal } = require('sequelize');



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
        const searchValue = `%${name}%`
        const motorcycle = await Motorcycle.findAll({
            where: {
                [Op.or]:[{
                    model: {
                        [Op.iLike]: searchValue
                    }
                }, {
                    brand: {
                        [Op.iLike]: searchValue
                    }
                }]
            },
            include: Item
        });
        res.status(200).json(motorcycle);

    } catch (error) {
        res.status(404).json({error: 'Motorcycle not found'});
    }
}

const createOneMotorcycle = async (obj) => {
    try {
        const motorcycle = await Motorcycle.findOrCreate({
            where: {
                brand: obj.brand,
                model: obj.model,
                year: obj.year,
                cc: obj.cc,
                transmission: obj.transmission,
                description: obj.description,
                image: obj.image,
                price: obj.price,
                category: obj.category,
            }
        });

        await Motorcycle.update(
            { stock: literal('stock + 1') },
            { where: { id: motorcycle[0].id } }
        );

        await Item.create({
            chassisId: obj.chassisId,
            color: obj.color,
            sold: false,
            motorcycleId: motorcycle[0].id, //revisar con metodo de sequalize
        });
    } catch (error) {
        throw new Error(error);
    }
}

const createMotorcycles = async (req, res) => {
    const motorcycles = req.body;

    try {
        if (!motorcycles) throw new Error('No hay motorcycles disponibles');
        if (!Array.isArray(motorcycles) && !(typeof motorcycles === 'object' && motorcycles !== null)) throw new Error('motorcycles debe ser de tipo array o de tipo objeto');

        const validateObject = (obj) => {
            const modelObj = {
                chassisId: 'string',
                brand: 'string',
                model: 'string',
                year: 'number',
                cc: 'number',
                color: 'string',
                transmission: 'string',
                description: 'string',
                image: 'string',
                price: 'number',
                category: 'string',
            };
            
            const errors = [];
            
            for (const prop in modelObj) {
                if (!obj.hasOwnProperty(prop)) {
                  errors.push(`Falta la propiedad '${prop}'.`);
                } else if (typeof obj[prop] !== modelObj[prop]) {
                  errors.push(`La propiedad '${prop}' tiene un tipo inválido. Se esperaba '${modelObj[prop]}', se recibió '${typeof obj[prop]}'.`);
                }
            }
              
            if (errors.length > 0) throw new Error(errors.join('\n'));
        }

        if (Array.isArray(motorcycles)) {
            motorcycles.forEach(el => validateObject(el));
            for (let i = 0; i < motorcycles.length; i++) {
                await createOneMotorcycle(motorcycles[i]);
            }
            res.status(200).send('motocycles creadas exitosamente');
        }

        else if (typeof motorcycles === 'object' && motorcycles !== null) {
            validateObject(motorcycles);
            await createOneMotorcycle(motorcycles);
            res.status(200).send('motocycle creada exitosamente');
        }
          
          
    } catch (error) {
        res.status(404).send(error.message);
    }
}

module.exports = {
    getMotorcycleById,
    getAllMotorcycles,
    createMotorcycles,
    getMotorcycleByName
}