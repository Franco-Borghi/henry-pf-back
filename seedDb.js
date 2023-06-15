const { createMotorcyclesSeed } = require("./src/controllers/Motorcycle.controller");

const data = require('./dataDinamo.json')

async function seedDb() {

    try {
        const req = {
            body: data
        };

        const res = {
            status: function () {
                return this;
            },
            send: function () {
                return this;
            }
        };

        await createMotorcyclesSeed(req, res)

        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database: ', error);
    }
}

module.exports = seedDb



