const seedDb = require('./seedDb.js');
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { PORT } = process.env;


conn.sync({ force: false }).then(() => {
  server.listen(PORT || 3001, () => {

    // seedDb();

    console.log('%s listening at 3001'); 
  });
});
