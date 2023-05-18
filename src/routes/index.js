const { Router } = require('express');
const { getAllMotorcycles, getMotorcycleById, getMotorcycleByName, createMotorcycles } = require('../controllers/Motorcycle.controller');


const router = Router();


router.get('/motorcycles', (req, res) => {
    if(req.query.name) getMotorcycleByName(req,res)
    else getAllMotorcycles(req,res)
})

router.get('/motorcycles/:id', getMotorcycleById)
router.post('/motorcycles', createMotorcycles)



module.exports = router;
