const { Orders, Item, Users } = require("../db.js")
const { getAllOrders, getOrderByUserId, updateOrder, createOrder } = require("./Orders.controller.js")

const mockRequest = () => {
    return {
        query: {},
        body: {},
        params: {}
    }
}


const mockResponse = () => {
    return {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    }
}

const mockOrders = [
    {
        orderNumber: "7DX17755G48734310",
        date: "2023-06-13",
        amountPaid: "99700.00",
        orderStatus: "Completed",
        userId: "auth0|6486419cc916e649478647bf",
        items: [
            {
                chassisId: "13443-123-B45-267-51",
                color: "White",
                sold: true,
                motorcycleId: "9d0dbcb1-f994-48c4-a084-edb6ac4a1454",
                orderNumber: "7DX17755G48734310",
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
                    stock: 1
                }
            },
            {
                chassisId: "13443-123-B45-267-83",
                color: "Black",
                sold: true,
                motorcycleId: "9d0dbcb1-f994-48c4-a084-edb6ac4a1454",
                orderNumber: "7DX17755G48734310",
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
                    stock: 1
                }
            }
        ]
    }
]

const mockOrderById = {
    active: true,
    email: 'test171@gmail.com',
    firstName: null,
    id: 'auth0|6486419cc916e649478647bf',
    idNumber: null,
    lastName: null,
    phoneNumber: null,
    role: 'client',
    orders: mockOrders,
};

describe('Orders Controller', () => {

    describe('getAllOrders', () => {

        it('should return all orders when there is no id passed', async () => {

            const req = mockRequest();
            const res = mockResponse();

            jest.spyOn(Orders, 'findAll').mockResolvedValueOnce(mockOrders);

            await getAllOrders(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockOrders);
        })

        it('should return an order when there is an id passed', async () => {

            const req = mockRequest();
            const res = mockResponse();

            req.query.id = "7DX17755G48734310"

            jest.spyOn(Orders, 'findOne').mockResolvedValueOnce(mockOrders[0]);

            await getAllOrders(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockOrders[0]);
        })

        it('should return an error when there is no order with the id', async () => {

            const req = mockRequest();
            const res = mockResponse();

            req.query.id = "7DX17755G48734310"

            jest.spyOn(Orders, 'findOne').mockRejectedValueOnce(new Error('error'));

            await getAllOrders(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: "Orders not Found" });
        })

        it('should return an error when it fails', async () => {

            const req = mockRequest();
            const res = mockResponse();

            jest.spyOn(Orders, 'findAll').mockRejectedValueOnce(new Error('error'));

            await getAllOrders(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: "Orders not Found" });
        })
    })

    describe('getOrderByUserId', () => {

        it('should return an order when there is an id passed', async () => {

            const req = mockRequest();
            const res = mockResponse();

            req.params.id = "auth0|6486419cc916e649478647bf"

            jest.spyOn(Users, 'findByPk').mockResolvedValueOnce(mockOrderById);

            await getOrderByUserId(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockOrderById);
        })

        it('should return an error when there is no order with the id', async () => {

            const req = mockRequest();
            const res = mockResponse();

            req.params.id = "auth0|6486419cc916e649478647bf"

            jest.spyOn(Users, 'findByPk').mockRejectedValueOnce(new Error('error'));

            await getOrderByUserId(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: "Orders not Found" });
        })
    })

    describe("updateOrder", () => {

        it("should update an order", async () => {

            const req = mockRequest();
            const res = mockResponse();

            req.body = {
                orderStatus: "Completed",
                orderNumber: "7DX17755G48734310"
            }

            jest.spyOn(Orders, 'update').mockResolvedValueOnce([1]);
            jest.spyOn(Orders, 'findByPk').mockResolvedValueOnce(mockOrders[0]);

            await updateOrder(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockOrders[0]);
        })

        it("should return an error when there is no order with the id", async () => {

            const req = mockRequest();
            const res = mockResponse();

            req.body = {
                orderStatus: "Completed",
                orderNumber: "7DX17755G48734310"
            }

            const mockError = new Error("Orders not Found");
            jest.spyOn(Orders, 'update').mockResolvedValueOnce([0]);
            jest.spyOn(Orders, 'findByPk').mockRejectedValueOnce(mockError);

            await updateOrder(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(mockError.message);
        })
    })

    //TODO: create test for createOrder

    // describe('createOrder', () => {

    //     it("should create an order", async () => {

    //         const req = mockRequest();
    //         const res = mockResponse();

    //         const mockOrderToCreate = {
    //             userId: "auth0|6486419cc916e649478647bf",
    //             items: [{
    //                 id: "9d0dbcb1-f994-48c4-a084-edb6ac4a1454",
    //                 color: "Black"
    //             }],
    //             amountPaid: "99700.00",
    //             orderNumber: "7DX17755G48734310",
    //             orderStatus: "Completed",
    //         }

    //         const mockUser = {
    //             id: "auth0|6486419cc916e649478647bf",
    //             email: "test171@gmail.com"
    //         };

    //         const mockItem = {
    //             chassisId: "13443-123-B45-267-51",
    //             color: "White",
    //             sold: false,
    //             motorcycleId: "9d0dbcb1-f994-48c4-a084-edb6ac4a1454",
    //             orderNumber: null
    //         }



    //     })
    // })
})