require('dotenv').config();
const {Item, Motorcycle} = require('../db.js');
const { Op, literal } = require('sequelize');


/* ----------------------------------- */
/* GET ENDPOINTS                       */
/* ----------------------------------- */

const getAllMotorcycles = async (req, res) => {
    try {
        const motorcycles = await Motorcycle.findAll({ include: Item });
        res.status(200).json(motorcycles);
    } catch (error) {
        res.status(404).json({error: 'Motorcycles not found'});
    }
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

    const searchValues = name.split(' ');

    const whereClause = searchValues.map(searchValue => ({
        [Op.or]: [
            {
                model: {
                    [Op.iLike]: `%${searchValue}%`
                }
            },
            {
                brand: {
                    [Op.iLike]: `%${searchValue}%`
                }
            }
        ]
    }));

    const motorcycle = await Motorcycle.findAll({
        where: {
            [Op.and]: whereClause
        },
        include: Item
    });

    res.status(200).json(motorcycle);

    } catch (error) {
        res.status(404).json({error: 'Motorcycle not found'});
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
        res.status(404).send(error);
    }
}

/* ----------------------------------- */
/* PUT ENDPOINTS                       */
/* ----------------------------------- */

const updateMotorcycle = async (req, res) => {

    const {id} = req.params;
    const {brand, model, year, cc, transmission, description, image, price, category, active } = req.body;

    console.log(req.body)
    console.log(req.params)
    try {
        
        const motorcycle = await Motorcycle.update(
            {
                brand,
                model,
                year,
                cc,
                transmission,
                description,
                image,
                price,
                category,
                active
            },
            {
                where: {
                    id,
                },
            }
        );

        const updatedMotorcycle = await Motorcycle.findByPk(id);
        res.status(200).json(updatedMotorcycle);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
}

const updateItem = async (req, res) => {

    const { itemId } = req.params;
    const { chassisId, color } = req.body;

    console.log(req.body)
    console.log(req.params)

    try {
      await Item.update(
        { 
            chassisId, 
            color 
        },
        {
            where: {
                chassisId: itemId,
            },
        }
      )

      const updateItem = await
      Item.findByPk(chassisId);
      res.status(200).json(updateItem);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
  };
  


/* ----------------------------------- */
/* POST ENDPOINTS                       */
/* ----------------------------------- */

const createOneMotorcycle = async (obj) => {

    //TODO: refactor - idealmente separamos esto en 2 pasos:
    // 1) buscar la moto solo por el motorcycleId, si lo encuentra solo agregar una moto a items
    // 2) Si no lo encuentra, crear la moto con todo lo que tenemos aca
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
            { stock: literal('stock + 1') }, // Hay que cambiarlo para que traiga la info de items.
            // { stock: updateMotorcycleStock(motorcycle[0].id)}, // chequear si esto funciona bien
            { where: { id: motorcycle[0].id } }
        );

        try{
        await motorcycle[0].createItem({
            chassisId: obj.chassisId,
            color: obj.color,
            sold: false,
          });
        }catch (error) {
            throw new Error(`The motorcycle with the chassis number ${obj.chassisId} has already been registered`)
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

const createMotorcycles = async (req, res) => {
    const motorcycles = req.body;

    try{
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
            motorcycles.forEach( el => {
                validateObject(el);
            });
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
    getAllMotorcycles,
    getMotorcycleById,
    getMotorcycleByName,
    updateMotorcycle,
    createMotorcycles,
    updateItem,
    getAllSoldItems
}