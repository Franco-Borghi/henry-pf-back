const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
 
  sequelize.define('orders', {
    orderNumber: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    date: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    amountPaid: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    orderStatus: {
        type: DataTypes.STRING,
        allowNull: false,
    },
  },{timestamps: false});
};
