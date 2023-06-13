const express = require('express')
const { generateImage } = require('../controllers/OpenAI.controller')

const openAIRouter = express.Router()


openAIRouter.post('/generateImage', generateImage)


module.exports = openAIRouter
