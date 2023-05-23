const { createMotorcycles } = require("./src/controllers/Motorcycle.controller");

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

        await createMotorcycles(req, res)

        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database: ', error);
    }
}

seedDb();

module.exports = seedDb



