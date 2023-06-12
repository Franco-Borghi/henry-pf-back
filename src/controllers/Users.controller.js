const { Users, Orders } = require('../db.js');

const createUser = async (req, res) => {
    try{
        const {email, user_id} = req.body;
        console.log(email, user_id);
        const user = await Users.create({ // No hago find or create, Auth0 se encarga de chequear que no haya un mail registrado
            id: user_id,
            email
        })
        res.status(201).json("User registered successfully")
    }catch(err){
        res.status(400).json(err.message)
    }
}

const updateUser = async (req, res) => {
    try{
        const {firstName, lastName, phoneNumber, idNumber, role, active } = req.body;

        if (typeof active === 'boolean' && role && typeof role === 'string') {
            await Users.update({ 
                firstName: firstName || null,
                lastName: lastName || null,
                phoneNumber: phoneNumber || null,
                idNumber: idNumber || null,
                active,
                role
            },
            { where: { id: req.params.id } })
            
            const user = await Users.findByPk(req.params.id)
            res.status(200).json(user);
        } else {
            await Users.update({ 
                firstName,
                lastName,
                phoneNumber,
                idNumber
            },
            { where: { id: req.params.id } })
            
            const user = await Users.findByPk(req.params.id)
            res.status(200).json(user);
        }
    }catch(err){
        res.status(400).json(err.message)
    }
}

const getUser = async (req, res) => {
    try{
        const {id} = req.params;
        const user = await Users.findOne({ where: { id } })
        res.status(200).json(user);
    }
    catch(err){
        res.status(400).json(err.message)

    }
}

const getUsers = async (req, res) => {
    try{
        const users = await Users.findAll({include: Orders})
        res.status(200).json(users);
    }
    catch(err){
        res.status(400).json(err.message)

    }
}

module.exports = {
    createUser,
    getUser,
    updateUser,
    getUsers
}