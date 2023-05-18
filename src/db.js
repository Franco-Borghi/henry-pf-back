require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/dinamomotos`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Motorcycle, Stock, Reviews, Orders } = sequelize.models;

/* -------------------------------------------------------------- */
/* Relations                                                      */
/* -------------------------------------------------------------- */

//TODO: revisar si es necesario poner foreignKey en ambos o donde seria mejor ponerlo

// Stock - Motorcycle
Motorcycle.hasMany(Stock, {
  foreignKey: {
    name: 'motorcycle_id',
    allowNull: false,
    },
    });

Stock.belongsTo(Motorcycle, {
  foreignKey: {
    name: 'motorcycle_id',
    allowNull: false,
  },
});

// Client - Reviews - Motorcycle

// Comentado hasta que tengamos el modelo de Clients

// Client.belongsToMany(Motorcycle, { through: Reviews });
// Motorcycle.belongsToMany(Client, { through: Reviews });

// Additional associations to enable different queries
// Review.belongsTo(Client);
// Client.hasMany(Review);
// Review.belongsTo(Motorcycle);
// Motorcycle.hasMany(Review);


////////////////////////////////////////////////////
// Relationship between Orders and Clients models //
////////////////////////////////////////////////////

// Clients.hasMany(Orders, { 
//   foreignKey: 'client_id'
// });

// Orders.belongsTo(Clients, { 
//   foreignKey: 'client_id'
// });


////////////////////////////////////////////////////
// Relationship between Orders and Stock models //
////////////////////////////////////////////////////

Orders.hasMany(Stock, { 
  foreignKey: 'order_number',
  allowNull: true,
 });

Stock.belongsTo(Orders, { 
  foreignKey: 'order_number',
  allowNull: true,
 });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
