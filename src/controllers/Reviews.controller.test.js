const { Reviews } = require('../db.js')
const { createReview, getReviews, getReviewsByMotorcycle, getReviewsByUser, updateReview, deleteReview } = require('./Reviews.controller.js')


const mockRequest = () => {
    return {
        body: {},
        params: {},
        query: {}
    }
}

const mockResponse = () => {
    return {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    }
}

const mockReviews = [
    {
        id: "b265ebc3-9250-498e-a495-90f2df1781a9",
        rating: 5,
        comment: "Muy buena moto",
        userId: "auth0|6486419cc916e649478647bf",
        motorcycleId: "ae9ef907-6f84-48c9-b1b8-4d86bbaa7faa",
        active: true,
        user: {
            firstName: null,
            lastName: null,
            email: "test171@gmail.com"
        },
        motorcycle: {
            brand: "DINAMO",
            model: "U5",
            year: 2023,
            price: 27900
        }
    }
]

describe('Reviews Controller', () => {

    describe('getReviews', () => {

        it('should return all reviews', async () => {

            const req = mockRequest();
            const res = mockResponse();

            jest.spyOn(Reviews, 'findAll').mockResolvedValueOnce(mockReviews);

            await getReviews(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockReviews);
        })

        it('should return 404 if there is an error', async () => {

            const req = mockRequest();
            const res = mockResponse();

            jest.spyOn(Reviews, 'findAll').mockRejectedValueOnce({ error: 'Reviews not found' });

            await getReviews(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Reviews not found' });
        })
    })

    describe('getReviewsByMotorcycle', () => {

        it('should return all reviews by motorcycle', async () => {

            const req = mockRequest();
            const res = mockResponse();

            req.params.motorcycleId = 'ae9ef907-6f84-48c9-b1b8-4d86bbaa7faa'

            jest.spyOn(Reviews, 'findAll').mockResolvedValueOnce(mockReviews[0]);

            await getReviewsByMotorcycle(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockReviews[0]);
        })

        it('should return 404 if there is an error', async () => {

            const req = mockRequest();
            const res = mockResponse();

            req.params.motorcycleId = 'ae9ef907-6f84-48c9-b1b8-4d86bbaa7faa'

            jest.spyOn(Reviews, 'findAll').mockRejectedValueOnce({ error: 'Reviews not found' });

            await getReviewsByMotorcycle(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Reviews not found' });
        })
    })

    describe('getReviewsByUser', () => {

        it('should return all reviews by user', async () => {

            const req = mockRequest();
            const res = mockResponse();

            req.params.userId = 'auth0|6486419cc916e649478647bf'

            jest.spyOn(Reviews, 'findAll').mockResolvedValueOnce(mockReviews[0]);

            await getReviewsByUser(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockReviews[0]);
        })

        it('should return 404 if there is an error', async () => {

            const req = mockRequest();
            const res = mockResponse();

            req.params.userId = 'auth0|6486419cc916e649478647bf'

            jest.spyOn(Reviews, 'findAll').mockRejectedValueOnce({ error: 'Reviews not found' });

            await getReviewsByUser(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Reviews not found' });
        })
    })

    describe('updateReview', () => {

        it('should update a review', async () => {

            const req = mockRequest();
            const res = mockResponse();

            req.params.reviewId = 'b265ebc3-9250-498e-a495-90f2df1781a9'
            req.body = {
                rating: 4,
                comment: "Muy buena moto",
                userId: "auth0|6486419cc916e649478647bf"
            }

            const reviewInstance = {
                ...mockReviews[0],
                save: jest.fn().mockResolvedValueOnce(mockReviews[0]),
            };

            jest.spyOn(Reviews, 'findByPk').mockResolvedValueOnce(reviewInstance);


            await updateReview(req, res);

            expect(reviewInstance.save).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                ...mockReviews[0],
                rating: req.body.rating,
                comment: req.body.comment,
            }));
        })

        it ('should return 400 if there is an error', async () => {

            const req = mockRequest();
            const res = mockResponse();

            req.params.reviewId = 'b265ebc3-9250-498e-a495-90f2df1781a9'

            jest.spyOn(Reviews, 'findByPk').mockRejectedValueOnce({ error: 'Review not found' });

            await updateReview(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Review not found' });

        })

    })

    describe('deleteReview', () => {

        it('should delete a review', async () => {

            const req = mockRequest();
            const res = mockResponse();

            req.params.reviewId = 'b265ebc3-9250-498e-a495-90f2df1781a9'

            req.body = {
                user: {
                    id: "auth0|6486419cc916e649478647bf",
                    role: "admin",
                },
            };

            const reviewInstance = {
                ...mockReviews[0],
                active: true,
                save: jest.fn().mockResolvedValueOnce({
                    ...mockReviews[0],
                    active: false,
                }),
            };

            jest.spyOn(Reviews, 'findByPk').mockResolvedValueOnce(reviewInstance);

            await deleteReview(req, res);

            expect(reviewInstance.save).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                ...mockReviews[0],
                active: false,
            }));

        })

        it('should return 400 if there is an error', async () => {

            const req = mockRequest();
            const res = mockResponse();

            req.params.reviewId = 'b265ebc3-9250-498e-a495-90f2df1781a9'

            req.body = {
                user: {
                    id: "auth0|6486419cc916e649478647bf",
                    role: "admin",
                },
            };

            jest.spyOn(Reviews, 'findByPk').mockRejectedValueOnce({ error: 'Review not found' });

            await deleteReview(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Review not found' });
        })
    })

})

