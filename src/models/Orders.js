const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
 
  sequelize.define('orders', {
    order_number: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    date: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    amount_paid: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    order_status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    items: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
  },{timestamps: false});
};
