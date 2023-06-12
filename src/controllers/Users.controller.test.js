const { Users } = require('../db.js')
const { createUser, updateUser, getUsers, getUser } = require('./Users.controller')

const mockRequest = () => {
    return {
        params: {},
        body: {}
    }
}

const mockResponse = () => {
    return {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
    }
}

const mockusers = [
    {
        id: "google-oauth2|1094526",
        firstName: "Ejemplo nombre",
        lastName: "Ejemplo apellido",
        email: "john@gmail.com",
        phoneNumber: null,
        idNumber: null,
        active: true,
        role: "client",
        orders: []
    }
]

afterEach(() => {
    jest.restoreAllMocks();
})


describe('Users controller', () => {

    describe('getUsers', () => {

        it('should get all users', async () => {

            jest.spyOn(Users, "findAll").mockResolvedValue(mockusers)

            const req = mockRequest()
            const res = mockResponse()

            await getUsers(req, res)

            expect(Users.findAll).toHaveBeenCalledTimes(1)
            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith(mockusers)
        })

        it('should return an error if something goes wrong', async () => {

            const mockError = new Error('Something went wrong')
            jest.spyOn(Users, 'findAll').mockRejectedValueOnce(mockError)

            const req = mockRequest()
            const res = mockResponse()

            await getUsers(req, res)


            expect(Users.findAll).toHaveBeenCalledTimes(1)
            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith(mockError)
        })

    })

    describe('get 1 User by id', () => {

        it('should get 1 user by id', async () => {

            jest.spyOn(Users, "findOne").mockResolvedValue(mockusers[0])

            const req = mockRequest()
            const res = mockResponse()

            req.params.id = "google-oauth2|1094526"

            await getUser(req, res)

            expect(Users.findOne).toHaveBeenCalledTimes(1)
            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith(mockusers[0])
        })

        it('should return an error if something goes wrong', async () => {

            const mockError = new Error('Something went wrong')
            jest.spyOn(Users, 'findOne').mockRejectedValueOnce(mockError)

            const req = mockRequest()
            const res = mockResponse()

            await getUser(req, res)

            expect(Users.findOne).toHaveBeenCalledTimes(1)
            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith(mockError)
        })
    })

    describe('createUser', () => {

        it('should create a new user', async () => {

            const mockCreateUser = {
                id: "google-oauth2|1094526",
                email: "john@doe.com"
            }

            jest.spyOn(Users, "create").mockResolvedValue(mockCreateUser)

            const req = mockRequest()
            const res = mockResponse()

            req.body = mockCreateUser

            await createUser(req, res)

            expect(Users.create).toHaveBeenCalledTimes(1)
            expect(res.status).toHaveBeenCalledWith(201)
            expect(res.json).toHaveBeenCalledWith("User registered successfully")

        })

        it('should return an error if something goes wrong', async () => {

            const mockError = new Error('Something went wrong')
            jest.spyOn(Users, 'create').mockRejectedValueOnce(mockError)

            const req = mockRequest()
            const res = mockResponse()

            await createUser(req, res)

            expect(Users.create).toHaveBeenCalledTimes(1)
            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith(mockError)
        })
    })

    describe('updateUser', () => {

        it('should update a user', async () => {

            const mockUserToUpdate = {
                id: "google-oauth2|1094526",
                firstName: "Ejemplo nombre",
                lastName: "Ejemplo apellido",
                phoneNumber: 123456789
            }

            const mockUpdatedUser = {
                id: "google-oauth2|1094526",
                firstName: "Ejemplo nombre",
                lastName: "Ejemplo apellido",
                email: "john@gmail.com",
                phoneNumber: 123456789,
                role: "client",
                orders: [],
                idNumber: null,
                active: true
            }

            jest.spyOn(Users, "update").mockResolvedValue([1])
            jest.spyOn(Users, "findByPk").mockResolvedValue(mockUpdatedUser)

            const req = mockRequest()
            const res = mockResponse()

            req.params.id = "google-oauth2|1094526"
            req.body = mockUserToUpdate

            await updateUser(req, res)

            expect(Users.update).toHaveBeenCalledTimes(1)
            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith(mockUpdatedUser)
        })

        it('should return an error if something goes wrong', async () => {

            const mockError = new Error('Something went wrong')
            jest.spyOn(Users, 'update').mockRejectedValueOnce(mockError)

            const req = mockRequest()
            const res = mockResponse()

            await updateUser(req, res)

            expect(Users.update).toHaveBeenCalledTimes(1)
            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith(mockError)
        })
    })
})


