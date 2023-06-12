const { Item } = require('../db.js');
const { getItems, updateItemColor, getAllSoldItems } = require('./Items.controller')


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

const mockItems = [
    {
        chassisId: "13443-123-B45-267-51",
        color: "White",
        sold: false,
        motorcycleId: "9d0dbcb1-f994-48c4-a084-edb6ac4a1454",
        orderNumber: null
    },
    {
        chassisId: "13443-123-B45-267-82",
        color: "Green",
        sold: false,
        motorcycleId: "9d0dbcb1-f994-48c4-a084-edb6ac4a1454",
        orderNumber: null
    },
    {
        chassisId: "13443-123-B45-267-83",
        color: "Black",
        sold: false,
        motorcycleId: "9d0dbcb1-f994-48c4-a084-edb6ac4a1454",
        orderNumber: null
    }
]

const mockItemsSold = [{
    chassisId: "13443-123-B45-267-51",
    color: "White",
    sold: true,
    motorcycleId: "9d0dbcb1-f994-48c4-a084-edb6ac4a1454",
    orderNumber: null
},
{
    chassisId: "13443-123-B45-267-82",
    color: "Green",
    sold: true,
    motorcycleId: "9d0dbcb1-f994-48c4-a084-edb6ac4a1454",
    orderNumber: null
},

]

const mockItemById = {
    chassisId: "13443-123-B45-267-51",
    color: "White",
    sold: false,
    motorcycleId: "9d0dbcb1-f994-48c4-a084-edb6ac4a1454",
    orderNumber: null,
    motorcycle: {
        id: "9d0dbcb1-f994-48c4-a084-edb6ac4a1454",
        brand: "BMW",
        model: "MAX-3",
        year: 2023,
        cc: 200,
        transmission: "Manual",
        description: "Maximum Speed: 125 KM/H\nFuel Efficiency: 25 KM/L\nEngine Type: 4-STROKE, 1 CYLINDER\nMaximum Power: 14.0 HP\nStart: ELECTRIC\nFuel Capacity: 19 L\n",
        image: "https://www.dinamotos.mx/wp-content/uploads/2023/02/1AUX-2.png",
        price: 35900,
        category: "Work",
        active: true,
        stock: 3
    }
}

afterEach(() => {
    jest.restoreAllMocks();
})

describe('Items Controller', () => {

    describe('getItems', () => {

        it('should return all items', async () => {

            jest.spyOn(Item, 'findAll').mockResolvedValueOnce(mockItems)

            const req = mockRequest()
            const res = mockResponse()

            await getItems(req, res)

            expect(Item.findAll).toHaveBeenCalledTimes(1)
            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith(mockItems)
        })

        it('should return an error if something goes wrong', async () => {

            jest.spyOn(Item, 'findAll').mockRejectedValueOnce(new Error('Something went wrong'))

            const req = mockRequest()
            const res = mockResponse()

            await getItems(req, res)

            expect(Item.findAll).toHaveBeenCalledTimes(1)
            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith('Something went wrong')
        })

    })


    describe('updateItemColor', () => {

        it('should update the color of an item', async () => {

            jest.spyOn(Item, 'update').mockResolvedValueOnce([1])

            jest.spyOn(Item, 'findByPk').mockResolvedValueOnce(mockItemById)

            const req = mockRequest()
            const res = mockResponse()

            req.params.id = '1234'
            req.body.color = 'Red'

            await updateItemColor(req, res)

            expect(Item.update).toHaveBeenCalledTimes(1)
            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith(mockItemById)
        })


       it('should return an error if something goes wrong', async () => {

            jest.spyOn(Item, 'update').mockRejectedValueOnce(new Error('Something went wrong'))

            const req = mockRequest()
            const res = mockResponse()

            req.params.id = '1234'
            req.body.color = 'Red'

            await updateItemColor(req, res)

            expect(Item.update).toHaveBeenCalledTimes(1)
            expect(res.status).toHaveBeenCalledWith(404)
            expect(res.json).toHaveBeenCalledWith('Something went wrong')
        })
    })

    describe("get All Sold Items", () => {
        it("should return all sold items", async () => {

            jest.spyOn(Item, 'findAll').mockResolvedValueOnce(mockItemsSold)

            const req = mockRequest()
            const res = mockResponse()

            await getAllSoldItems(req, res)

            expect(Item.findAll).toHaveBeenCalledTimes(1)
            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith(mockItemsSold)
        })

        it('should return an error if something goes wrong', async () => {

            jest.spyOn(Item, 'findAll').mockRejectedValueOnce(new Error('Something went wrong'))

            const req = mockRequest()
            const res = mockResponse()

            await getAllSoldItems(req, res)

            expect(Item.findAll).toHaveBeenCalledTimes(1)
            expect(res.status).toHaveBeenCalledWith(404)
            expect(res.json).toHaveBeenCalledWith('Something went wrong')
        })
    })
})


