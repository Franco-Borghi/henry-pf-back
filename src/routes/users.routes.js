const express = require('express')
const { getUser, updateUser, getUsers, createUser } = require('../controllers/Users.controller');

const usersRouter = express.Router()

usersRouter.post('/', createUser)

usersRouter.get('/', getUsers)

usersRouter.put('/:id', updateUser)

usersRouter.get('/:id', getUser)

module.exports = usersRouter