const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
 
  sequelize.define('orders', {
    orderNumber: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    date: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    amountPaid: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    orderStatus: {
        type: DataTypes.STRING,
        allowNull: false,
    },
  },{timestamps: false});
};
