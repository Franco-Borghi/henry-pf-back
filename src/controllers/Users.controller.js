const { Users } = require('../db.js');

const createUser = async (req, res) => {
    try{
        const {email, user_id} = req.body;
        console.log(email, user_id);
        const user = await Users.create({ // No hago find or create, Auth0 se encarga de chequear que no haya un mail registrado
            id: user_id,
            email
        })
        res.status(200).send("User registered successfully")
    }catch(err){
        res.status(400).send(err)
    }
}

const updateUser = async (req, res) => {
    try{
        const {firstName, lastName, phoneNumber,} = req.body;
        const user = await Users.update({ 
            firstName,
            lastName,
            phoneNumber,
        },
        { where: { id: req.params.id } }

          )
        res.status(200).json(user)
    }catch(err){
        res.status(400).send(err)

    }
}

const getUser = async (req, res) => {
    try{
        const {id} = req.params;
        const user = await Users.findOne(
        { where: { id } }

          )
        res.status(200).json(user)
    }catch(err){
        res.status(400).send(err)

    }
}

module.exports = {
    createUser,
    getUser,
    updateUser,
}