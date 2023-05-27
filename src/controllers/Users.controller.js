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

module.exports = {
    createUser
}