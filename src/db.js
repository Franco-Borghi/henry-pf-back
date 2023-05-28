require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_DEPLOY
} = process.env;

// const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/dinamomotos`, {
//   logging: false, // set to console.log to see the raw SQL queries
//   native: false, // lets Sequelize know we can use pg-native for ~30% more speed
// });
const sequelize = new Sequelize(DB_DEPLOY, {
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


modelDefiners.forEach(model => model(sequelize));
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const { Motorcycle, Item, Reviews, Orders, Users } = sequelize.models;

/* -------------------------------------------------------------- */
/* Relations                                                      */
/* -------------------------------------------------------------- */

// Item - Motorcycle
Motorcycle.hasMany(Item, {
  foreignKey: {
    allowNull: false,
  },
});

Item.belongsTo(Motorcycle, {
  foreignKey: {
    allowNull: false,
  },
});

// Users - Reviews - Motorcycle

// Comentado hasta que tengamos el modelo de Clients

Users.belongsToMany(Motorcycle, { through: Reviews });
Motorcycle.belongsToMany(Users, { through: Reviews });

// Additional associations to enable different queries
Reviews.belongsTo(Users);
Users.hasMany(Reviews);
Reviews.belongsTo(Motorcycle);
Motorcycle.hasMany(Reviews);


////////////////////////////////////////////////////
// Relationship between Orders and Clients models //
////////////////////////////////////////////////////

//TODO: descomentar una vez que se cree el user controller para post
// Users.hasMany(Orders, {
//   foreignKey: {
//     allowNull: false,
//   }
// });

// Orders.belongsTo(Users, {
//   foreignKey: {
//     allowNull: false,
//   }
// });


////////////////////////////////////////////////////
// Relationship between Orders and Item models //
////////////////////////////////////////////////////

Orders.hasMany(Item, {
  foreignKey: {
    name: "orderNumber",
    allowNull: true
  },
});

Item.belongsTo(Orders, {
  foreignKey: {
    name: "orderNumber",
    allowNull: true
  },
});

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
