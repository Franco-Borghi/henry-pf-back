const { Motorcycle } = require('../db.js')
const { getAllMotorcycles, getMotorcycleById, getMotorcycleByName, updateMotorcycle, createMotorcycles, createOneMotorcycle } = require('./Motorcycle.controller')
const { uploadPhoto } = require('../utils/uploadPhoto.js');


const mockRequest = () => {
    return {
        params: {},
        body: {},
        query: {}
    }
}

const mockResponse = () => {

    return {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
    }
}

const mockMotorcycles = [
    {
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
        stock: 3,
        items: [
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
    }
]

const motorcycleToUpdate = {
    brand: "BMW",
    model: "MAX-3",
    year: 2023,
    cc: 250,
    transmission: "Manual",
    description: "Maximum Speed: 125 KM/H\nFuel Efficiency: 25 KM/L\nEngine Type: 4-STROKE, 1 CYLINDER\nMaximum Power: 14.0 HP\nStart: ELECTRIC\nFuel Capacity: 19 L\n",
    image: "https://www.dinamotos.mx/wp-content/uploads/2023/02/1AUX-2.png",
    price: 35900,
    category: "Sport",
    active: true,
}

const motorcycleToCreate = {
    chassiId: "13443-123-B45-267-51",
    brand: "BMW",
    model: "MAX-7",
    year: 2023,
    cc: 250,
    transmission: "Manual",
    description: "Maximum Speed: 125 KM/H\nFuel Efficiency: 25 KM/L\nEngine Type: 4-STROKE, 1 CYLINDER\nMaximum Power: 14.0 HP\nStart: ELECTRIC\nFuel Capacity: 19 L\n",
    image: "https://www.dinamotos.mx/wp-content/uploads/2023/02/1AUX-2.png",
    price: 35900,
    category: "Sport",
    active: true,
}

const updatedMotorcycle = {
        id: "9d0dbcb1-f994-48c4-a084-edb6ac4a1454",
        brand: "BMW",
        model: "MAX-3",
        year: 2023,
        cc: 250,
        transmission: "Manual",
        description: "Maximum Speed: 125 KM/H\nFuel Efficiency: 25 KM/L\nEngine Type: 4-STROKE, 1 CYLINDER\nMaximum Power: 14.0 HP\nStart: ELECTRIC\nFuel Capacity: 19 L\n",
        image: "https://www.dinamotos.mx/wp-content/uploads/2023/02/1AUX-2.png",
        price: 35900,
        category: "Sport",
        active: true,
        stock: 3,
        items: [
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
    
}

describe('Motorcycle Controller', () => {

    describe('getAllMotorcycles', () => {

        it('should return all motorcycles', async () => {
            const req = mockRequest();
            const res = mockResponse();

            jest.spyOn(Motorcycle, 'findAll').mockResolvedValueOnce(mockMotorcycles);

            await getAllMotorcycles(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockMotorcycles);
        })

        it('should return 404 if there is an error', async () => {

            const req = mockRequest();
            const res = mockResponse();

            jest.spyOn(Motorcycle, 'findAll').mockRejectedValueOnce({error: 'Motorcycles not found'});

            await getAllMotorcycles(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({error: 'Motorcycles not found'});
        })
    })

    describe('getMotorcycleById', () => {

        it('should return a motorcycle by id', async () => {

            const req = mockRequest();
            const res = mockResponse();

            req.params.id = '9d0dbcb1-f994-48c4-a084-edb6ac4a1454';

            jest.spyOn(Motorcycle, 'findOne').mockResolvedValueOnce(mockMotorcycles[0]);

            await getMotorcycleById(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockMotorcycles[0]);
        })

        it('should return 404 if there is an error', async () => {

            const req = mockRequest();
            const res = mockResponse();

            req.params.id = '9d0dbcb1-f994-48c4-a084-edb6ac4a1454';

            jest.spyOn(Motorcycle, 'findOne').mockRejectedValueOnce({error: 'Motorcycle not found'});

            await getMotorcycleById(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({error: 'Motorcycle not found'});
        })
    })

    describe('getMotorcycleByName', () => {

        it('should return a motorcycle by name', async () => {

            const req = mockRequest();
            const res = mockResponse();

            req.query.name = 'MAX-3';

            jest.spyOn(Motorcycle, 'findAll').mockResolvedValueOnce([mockMotorcycles[0]]);

            await getMotorcycleByName(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([mockMotorcycles[0]]);
        })

        it('should return 404 if there is an error', async () => {

            const req = mockRequest();
            const res = mockResponse();

            req.query.name = 'MAX-5';

            jest.spyOn(Motorcycle, 'findAll').mockRejectedValueOnce({error: 'Motorcycle not found'});

            await getMotorcycleByName(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({error: 'Motorcycle not found'});
        })
    })

    describe('updateMotorcycle', () => {

        it('should update a motorcycle', async () => {

            const req = mockRequest();
            const res = mockResponse();

            req.params.id = '9d0dbcb1-f994-48c4-a084-edb6ac4a1454';
            req.body = motorcycleToUpdate;

            jest.spyOn(Motorcycle, 'update').mockResolvedValueOnce([1]);
            jest.spyOn(Motorcycle, "findByPk").mockResolvedValueOnce(updatedMotorcycle);

            await updateMotorcycle(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(updatedMotorcycle);
        })


        it('should return 404 if there is an error', async () => {

            const req = mockRequest();
            const res = mockResponse();

            req.params.id = '9d0dbcb1-f994-48c4-a084-edb6ac4a1454';
            req.body = motorcycleToUpdate;

            const mockError = new Error('Motorcycle not found');

            jest.spyOn(Motorcycle, 'update').mockRejectedValueOnce(mockError);

            await updateMotorcycle(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({error: mockError.message});
        })
    })

    describe("createMotorcycles", () => {

    //TODO: CreateOneMotorcycle & CreateMotorcycles

})

    

})